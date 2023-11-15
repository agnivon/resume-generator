import { isAuthenticated } from "@/utils/session.utils";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request: Request) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    const previewSettings = await prisma.resumePreviewSettings.findMany({});
    return NextResponse.json(previewSettings);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
