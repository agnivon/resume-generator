import prisma from "@/clients/prismaClient";
import { CompleteResume } from "@/types/resume.types";
import { isAuthenticated } from "@/utils/session.utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


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
