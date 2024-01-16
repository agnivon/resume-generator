import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { ResumeV2 } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume = await prisma.resumeV2.findUniqueOrThrow({
        where: { id: params.resumeId, userId: session.user.id },
      });
      return NextResponse.json<ResumeV2>(resume);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
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
      const resume: Partial<ResumeV2> = await request.json();

      const updatedResume = await prisma.resumeV2.update({
        where: { id: params.resumeId, userId: session.user.id },
        data: exclude(resume, ["id"]),
      });
      return NextResponse.json<ResumeV2>(updatedResume);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const deletedResume = await prisma.resumeV2.delete({
        where: { id: params.resumeId, userId: session.user.id },
      });
      return NextResponse.json<ResumeV2>(deletedResume);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
