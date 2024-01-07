import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import { isAuthenticated } from "@/utils/session.utils";
import { ResumeV2 } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume: ResumeV2 = await request.json();

      const createdResume = await prisma.resumeV2.create({
        data: exclude(resume, ["id"]),
      });
      return NextResponse.json<ResumeV2>(createdResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
