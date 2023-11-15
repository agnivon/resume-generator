import { Experience } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { isAuthenticated } from "@/utils/session.utils";
import { ExperienceSchema } from "@/validation/schema/resume.schema";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const experiences: Experience[] = await prisma.experience.findMany({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Experience[]>(experiences);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    try {
      const experiences: Experience[] = await Yup.array()
        .of(ExperienceSchema)
        .defined()
        .validate(await request.json());

      const upsertedExperiences = await prisma.$transaction(
        experiences.map((ent) =>
          !ent.id
            ? prisma["experience"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["experience"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Experience[]>(upsertedExperiences);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get("id");
      if (!id) throw Error("Id not provided");
      const deletedExperience = await prisma.experience.delete({
        where: { id },
      });
      return NextResponse.json<Experience>(deletedExperience);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
