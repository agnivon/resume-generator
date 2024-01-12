import prisma from "@/clients/prismaClient";
import { CompleteResume } from "@/types/resume.types";
import {
  getUniqueCompleteResume,
  deleteCompleteResume,
} from "@/utils/prisma.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const resume: CompleteResume = await getUniqueCompleteResume(
      params.resumeId
    );
    return NextResponse.json<CompleteResume>(resume);
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
    const resume: CompleteResume | null = await deleteCompleteResume(
      params.resumeId
    );
    return NextResponse.json<CompleteResume | null>(resume);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
