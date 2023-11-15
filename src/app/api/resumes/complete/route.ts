import { CompleteResume } from "@/types/resume.types";
import { isAuthenticated } from "@/utils/session.utils";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const resumes = await prisma.resume.findMany({
      where: { userId: session?.user?.email || "" },
      include: {
        contact: true,
        experiences: true,
        projects: true,
        education: true,
        certifications: true,
        courses: true,
        skills: true,
      },
      orderBy: {
        createdOn: "desc",
      },
    });

    return NextResponse.json<CompleteResume[]>(resumes);
  } else {
    NextResponse.error();
  }
}
