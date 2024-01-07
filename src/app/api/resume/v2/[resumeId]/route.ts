import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import { isAuthenticated } from "@/utils/session.utils";
import { ResumeV2 } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume = await prisma.resumeV2.findUniqueOrThrow({
        where: { id: params.resumeId },
      });
      return NextResponse.json<ResumeV2>(resume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
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
      const resume: Partial<ResumeV2> = await request.json();

      const updatedResume = await prisma.resumeV2.update({
        where: { id: params.resumeId },
        data: exclude(resume, ["id"]),
      });
      return NextResponse.json<ResumeV2>(updatedResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
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
    try {
      const deletedResume = await prisma.resumeV2.delete({
        where: { id: params.resumeId },
      });
      return NextResponse.json<ResumeV2>(deletedResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
