import prisma from "@/clients/prismaClient";
import { isAuthenticated } from "@/utils/session.utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const previewSettings = await prisma.resumePreviewSettings.findFirst({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json(previewSettings);
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
    const previewSettings = await request.json();
    const upsertedPreviewSettings = await prisma.resumePreviewSettings.upsert({
      where: { resumeId: params.resumeId },
      update: previewSettings,
      create: { ...previewSettings, resumeId: params.resumeId },
    });
    return NextResponse.json(upsertedPreviewSettings);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
