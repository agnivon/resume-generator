import prisma from "@/clients/prismaClient";
import { Contact } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import {
  ContactSchema
} from "@/validation/schema/payload/resume.schema";
import { NextResponse } from "next/server";


export async function GET(
  _request: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    const contact: Contact | null = await prisma.contact.findFirst({
      where: { resumeId: params.resumeId },
    });
    return NextResponse.json<Contact | null>(contact);
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
      const contact: Contact = await ContactSchema.validate(
        await request.json()
      );

      let upsertedContact = null;
      if (!contact.id) {
        upsertedContact = await prisma.contact.create({
          data: {
            ...exclude(contact, ["id"]),
            resumeId: params.resumeId,
          },
        });
      } else {
        upsertedContact = await prisma.contact.update({
          where: {
            id: contact.id,
          },
          data: exclude(contact, ["id"]),
        });
      }
      return NextResponse.json<Contact | null>(upsertedContact);
    } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
