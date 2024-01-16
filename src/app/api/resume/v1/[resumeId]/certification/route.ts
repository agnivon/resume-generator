import prisma from "@/clients/prismaClient";
import { Certification } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { CertificationSchema } from "@/validation/schema/resume.schema";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const certifications: Certification[] = await prisma.certification.findMany(
      {
        where: { resumeId: params.resumeId },
      }
    );
    return NextResponse.json<Certification[]>(certifications);
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const certifications: Certification[] = await Yup.array()
        .of(CertificationSchema)
        .defined()
        .validate(await request.json());

      const upsertedCertifications = await Promise.all(
        certifications.map((ent) =>
          !ent.id
            ? prisma["certification"].create({
                data: exclude(ent, ["id"]),
              })
            : prisma["certification"].update({
                where: {
                  id: ent.id,
                },
                data: exclude(ent, ["id"]),
              })
        )
      );

      return NextResponse.json<Certification[]>(upsertedCertifications);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get("id");
      if (!id) throw Error("Id not provided");
      const deletedCertification = await prisma.certification.delete({
        where: { id },
      });
      return NextResponse.json<Certification>(deletedCertification);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
