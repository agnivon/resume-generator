import { CompleteResume, Resume } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { isAuthenticated } from "@/utils/session.utils";
import { ResumeSchema } from "@/validation/schema/resume.schema";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume: Pick<Resume, "id" | "name" | "userId"> &
        Partial<Pick<Resume, "createdOn" | "summary">> =
        await ResumeSchema.validate(await request.json());

      const updatedResume = await prisma.resume.update({
        where: {
          id: params.resumeId,
        },
        data: exclude(resume, ["id", "userId"]),
      });
      return NextResponse.json<
        Pick<CompleteResume, "id" | "name" | "createdOn" | "summary" | "userId">
      >(updatedResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
