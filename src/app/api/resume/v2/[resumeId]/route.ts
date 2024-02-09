import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import { getErrorMessage } from "@/utils/response.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { ResumeV2PartialSchema } from "@/validation/schema/resume.v2.schema";
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
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
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
      const payload = await request.json();
      //console.log(payload);
      const resume: Partial<ResumeV2> = await ResumeV2PartialSchema.validate(
        payload
      );

      const updatedResume = await prisma.resumeV2.update({
        where: { id: params.resumeId, userId: session.user.id },
        data: exclude(resume, ["id"]),
      });
      return NextResponse.json<ResumeV2>(updatedResume);
    } catch (err) {
      console.log(err);
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
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
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
