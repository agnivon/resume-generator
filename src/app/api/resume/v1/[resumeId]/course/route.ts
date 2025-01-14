import prisma from "@/clients/prismaClient";
import { Course } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { CourseSchema } from "@/validation/schema/payload/resume.schema";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";


export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const courses: Course[] = await prisma.course.findMany({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Course[]>(courses);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const courses: Course[] = await Yup.array()
        .of(CourseSchema)
        .defined()
        .validate(await request.json());

      const upsertedCourses = await prisma.$transaction(
        courses.map((ent) =>
          !ent.id
            ? prisma["course"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["course"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Course[]>(upsertedCourses);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get("id");
      if (!id) throw Error("Id not provided");
      const deletedCourse = await prisma.course.delete({
        where: { id },
      });
      return NextResponse.json<Course>(deletedCourse);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
