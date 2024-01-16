import prisma from "@/clients/prismaClient";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { ResumeV2 } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session) && session.user.id) {
    try {
      const resumes = await prisma.resumeV2.findMany({
        where: { userId: session.user.id },
        orderBy: { createdOn: "desc" },
      });
      return NextResponse.json<ResumeV2[]>(resumes);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
