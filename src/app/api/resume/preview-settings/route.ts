import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const previewSettings = await prisma.resumePreviewSettings.findMany({});
    return NextResponse.json(previewSettings);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
