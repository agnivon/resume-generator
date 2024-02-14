import prisma from "@/clients/prismaClient";
import { getErrorMessage } from "@/utils/response.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { ResumeTagSchema } from "@/validation/schema/payload/resume.schema";
import { ResumeTag } from "@prisma/client";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { tagId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const payload = await request.json();
      //console.log(payload);
      const tag = await ResumeTagSchema.validate(payload);

      const updatedTag = await prisma.resumeTag.update({
        where: { id: params.tagId, userId: session.user.id },
        data: tag,
      });
      return NextResponse.json<ResumeTag>(updatedTag);
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
  request: Request,
  { params }: { params: { tagId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const deletedTag = await prisma.resumeTag.delete({
        where: { userId: session.user.id, id: params.tagId },
      });
      await prisma.$runCommandRaw({
        update: "resumes-v2",
        updates: [
          {
            q: {
              tags: {
                $in: [deletedTag.id],
              },
              //userId: new ObjectId(session.user.id),
            },
            u: { $pull: { tags: deletedTag.id } },
          },
        ],
      });
      return NextResponse.json<ResumeTag>(deletedTag);
    } catch (err) {
      console.log(err);
      const { status, message } = getErrorMessage(err);
      return new NextResponse(message, { status });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
