import prisma from "@/clients/prismaClient";
import { Education } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { EducationSchema } from "@/validation/schema/payload/resume.schema";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";


export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const education: Education[] = await prisma.education.findMany({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Education[]>(education);
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
      const education: Education[] = await Yup.array()
        .of(EducationSchema)
        .defined()
        .validate(await request.json());

      const upsertedEducations = await prisma.$transaction(
        education.map((ent) =>
          !ent.id
            ? prisma["education"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["education"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Education[]>(upsertedEducations);
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
      const deletedEducation = await prisma.education.delete({
        where: { id },
      });
      return NextResponse.json<Education>(deletedEducation);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
