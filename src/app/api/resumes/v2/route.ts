import prisma from "@/clients/prismaClient";
import { isAuthenticated } from "@/utils/session.utils";
import { ResumeV2 } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await getServerSession();

  if (isAuthenticated(session) && session.user?.email) {
    try {
      const resumes = await prisma.resumeV2.findMany({
        where: { userId: session.user.email },
        orderBy: { createdOn: "desc" },
      });
      return NextResponse.json<ResumeV2[]>(resumes);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
