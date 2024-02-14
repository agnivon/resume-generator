import prisma from "@/clients/prismaClient";
import { getErrorMessage } from "@/utils/response.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { ResumeTagSchema } from "@/validation/schema/payload/resume.schema";
import { ResumeTag, ResumeV2 } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session) && session.user.id) {
    try {
      const tags = await prisma.resumeTag.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json<ResumeTag[]>(tags);
    } catch (err) {
      console.log(err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function POST(request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const tag = await ResumeTagSchema.validate(await request.json());

      const createdTag = await prisma.resumeTag.create({
        data: { ...tag, userId: session.user.id },
      });
      return NextResponse.json<ResumeTag>(createdTag);
    } catch (err) {
      console.log(err);
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
