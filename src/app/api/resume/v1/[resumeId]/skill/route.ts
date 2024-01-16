import { Skill } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { SkillSchema } from "@/validation/schema/resume.schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const skills: Skill[] = await prisma.skill.findMany({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Skill[]>(skills);
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
      const skills: Skill[] = await Yup.array()
        .of(SkillSchema)
        .defined()
        .validate(await request.json());

      const upsertedSkills = await prisma.$transaction(
        skills.map((ent) =>
          !ent.id
            ? prisma["skill"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["skill"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Skill[]>(upsertedSkills);
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
      const deletedSkill = await prisma.skill.delete({
        where: { id },
      });
      return NextResponse.json<Skill>(deletedSkill);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
