import { CompleteResume } from "@/types/resume.types";
import { isAuthenticated } from "@/utils/session.utils";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const resume: CompleteResume = await prisma.resume.findUniqueOrThrow({
      where: { id: params.resumeId },
      include: {
        contact: true,
        experiences: { orderBy: { displayOrder: "asc" } },
        projects: { orderBy: { displayOrder: "asc" } },
        education: { orderBy: { displayOrder: "asc" } },
        certifications: { orderBy: { displayOrder: "asc" } },
        courses: { orderBy: { displayOrder: "asc" } },
        skills: { orderBy: { displayOrder: "asc" } },
      },
    });
    return NextResponse.json<CompleteResume>(resume);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const resume: CompleteResume | null = await prisma.resume.delete({
      where: { id: params.resumeId },
      include: {
        contact: true,
        experiences: { orderBy: { displayOrder: "asc" } },
        projects: { orderBy: { displayOrder: "asc" } },
        education: { orderBy: { displayOrder: "asc" } },
        certifications: { orderBy: { displayOrder: "asc" } },
        courses: { orderBy: { displayOrder: "asc" } },
        skills: { orderBy: { displayOrder: "asc" } },
      },
    });
    return NextResponse.json<CompleteResume | null>(resume);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
