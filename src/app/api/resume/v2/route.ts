import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import { getErrorMessage } from "@/utils/response.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { NewResumeV2Schema } from "@/validation/schema/resume.v2.schema";
import { ResumeV2 } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume = await NewResumeV2Schema.validate(await request.json());

      const createdResume = await prisma.resumeV2.create({
        data: resume,
      });
      return NextResponse.json<ResumeV2>(createdResume);
    } catch (err) {
      console.log(err);
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
