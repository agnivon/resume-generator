import prisma from "@/clients/prismaClient";
import { Project } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { isAuthenticated } from "@/utils/session.utils";
import { ProjectSchema } from "@/validation/schema/resume.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const projects: Project[] = await prisma.project.findMany({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Project[]>(projects);
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
      const projects: Project[] = await Yup.array()
        .of(ProjectSchema)
        .defined()
        .validate(await request.json());

      const upsertedProjects = await prisma.$transaction(
        projects.map((ent) =>
          !ent.id
            ? prisma["project"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["project"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Project[]>(upsertedProjects);
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
      const deletedProject = await prisma.project.delete({
        where: { id },
      });
      return NextResponse.json<Project>(deletedProject);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
