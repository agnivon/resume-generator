import prisma from "@/clients/prismaClient";
import { exclude } from "@/utils/object.utils";
import { getErrorMessage } from "@/utils/response.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { NewResumeV2Schema } from "@/validation/schema/payload/resume.v2.schema";
import { ResumeV2 } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume = await prisma.resumeV2.findUniqueOrThrow({
        where: {
          id: params.resumeId,
        },
        include: {
          previewSettings: true,
        },
      });

      const newResume = await prisma.resumeV2.create({
        data: {
          ...exclude(resume, [
            "id",
            "createdAt",
            "updatedAt",
            "previewSettings",
          ]),
          name: resume.name + " (Copy)",
          previewSettings: {
            create: resume.previewSettings
              ? exclude(resume.previewSettings, ["id", "resumeId"])
              : undefined,
          },
        },
        include: {
          previewSettings: true,
        },
      });
      return NextResponse.json<ResumeV2>(newResume);
    } catch (err) {
      console.log(err);
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
