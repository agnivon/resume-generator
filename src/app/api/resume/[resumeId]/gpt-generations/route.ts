import prisma from "@/clients/prismaClient";
import { GPTGenerationType } from "@/constants/generation.constants";
import { GPTGeneration } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const TypeSchema = Yup.string().oneOf(Object.values(GPTGenerationType));

export async function GET(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const typeParam = request.nextUrl.searchParams.get("type");
    const isTypeValid = Yup.string()
      .oneOf(Object.values(GPTGenerationType))
      .isValidSync(request.nextUrl.searchParams.get("type"));
    const type = isTypeValid
      ? TypeSchema.validateSync(typeParam)!
      : GPTGenerationType.SUMMARY;
    const generations = await prisma.gPTGeneration.findMany({
      where: { resumeId: params.resumeId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json<GPTGeneration[]>(generations);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
