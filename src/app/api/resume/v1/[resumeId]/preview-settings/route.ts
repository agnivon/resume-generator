import prisma from "@/clients/prismaClient";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { NextResponse } from "next/server";

export async function GET(_request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const params = await props.params;
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const previewSettings = await prisma.resumePreviewSettings.findFirst({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json(previewSettings);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const params = await props.params;
  const session = await getNextAuthServerSession();

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
