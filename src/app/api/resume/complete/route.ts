import prisma from "@/clients/prismaClient";
import { CompleteResume } from "@/types/resume.types";
import { exclude } from "@/utils/object.utils";
import { getUniqueCompleteResume } from "@/utils/prisma.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { CompleteResumeSchema } from "@/validation/schema/resume.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume: CompleteResume = await CompleteResumeSchema.validate(
        await request.json()
      );

      // Save resume
      const insertedResume = await prisma.resume.create({
        data: {
          name: resume.name,
          userId: resume.userId,
          summary: resume.summary,
          domain: resume.domain,
          experienceLevel: resume.experienceLevel,
          jobTitle: resume.jobTitle,
          companyName: resume.companyName,
          jobDescription: resume.jobDescription,
          createdOn: resume.createdOn || Date.now(),
        },
      });

      // Save contact info
      let insertedContact = null;
      if (resume.contact) {
        insertedContact = await prisma.contact.create({
          data: {
            ...exclude(resume.contact, ["id"]),
            resumeId: insertedResume.id,
          },
        });
      }

      // Save experiences
      const insertedExperiences = await prisma.$transaction(
        resume["experiences"].map((ent) =>
          prisma["experience"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      // Save projects
      const insertedProjects = await prisma.$transaction(
        resume["projects"].map((ent) =>
          prisma["project"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      // Save education
      const insertedEducation = await prisma.$transaction(
        resume["education"]?.map((ent) =>
          prisma["education"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      // Save certifications
      const insertedCertifications = await prisma.$transaction(
        resume["certifications"].map((ent) =>
          prisma["certification"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      // Save courses
      const insertedCourses = await prisma.$transaction(
        resume["courses"]?.map((ent) =>
          prisma["course"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      // Save skills
      const insertedSkills = await prisma.$transaction(
        resume["skills"].map((ent) =>
          prisma["skill"].create({
            data: { ...exclude(ent, ["id"]), resumeId: insertedResume.id },
          })
        ) || []
      );

      const insertedCompleteResume: CompleteResume = {
        ...insertedResume,
        contact: insertedContact,
        experiences: insertedExperiences,
        projects: insertedProjects,
        education: insertedEducation,
        certifications: insertedCertifications,
        courses: insertedCourses,
        skills: insertedSkills,
      };

      return NextResponse.json<CompleteResume>(insertedCompleteResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}

export async function PUT(request: Request) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const resume: Partial<CompleteResume> &
        Pick<CompleteResume, "id" | "name" | "userId"> = await request.json();

      // Save resume
      const upsertedResume = !resume.id
        ? await prisma.resume.create({
            data: {
              name: resume.name,
              userId: resume.userId,
              summary: resume.summary || "",
              domain: resume.domain || "",
              experienceLevel: resume.experienceLevel || "",
              jobTitle: resume.jobTitle || "",
              companyName: resume.companyName || "",
              jobDescription: resume.jobDescription || "",
              createdOn: resume.createdOn || Date.now(),
            },
          })
        : await prisma.resume.update({
            where: {
              id: resume.id,
            },
            data: {
              name: resume.name,
              summary: resume.summary,
            },
          });

      // Save contact info
      if (resume.contact) {
        if (!resume.contact.id) {
          await prisma.contact.create({
            data: {
              ...exclude(resume.contact, ["id"]),
              resumeId: upsertedResume.id,
            },
          });
        } else {
          await prisma.contact.update({
            where: {
              id: resume.contact.id,
            },
            data: {
              ...exclude(resume.contact, ["id"]),
              resumeId: upsertedResume.id,
            },
          });
        }
      }

      // Save experiences
      await prisma.$transaction(
        resume["experiences"]?.map((ent) =>
          !ent.id
            ? prisma["experience"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["experience"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      // Save projects
      await prisma.$transaction(
        resume["projects"]?.map((ent) =>
          !ent.id
            ? prisma["project"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["project"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      // Save education
      await prisma.$transaction(
        resume["education"]?.map((ent) =>
          !ent.id
            ? prisma["education"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["education"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      // Save certifications
      await prisma.$transaction(
        resume["certifications"]?.map((ent) =>
          !ent.id
            ? prisma["certification"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["certification"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      // Save courses
      await prisma.$transaction(
        resume["courses"]?.map((ent) =>
          !ent.id
            ? prisma["course"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["course"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      // Save skills
      await prisma.$transaction(
        resume["skills"]?.map((ent) =>
          !ent.id
            ? prisma["skill"].create({
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
            : prisma["skill"].update({
                where: {
                  id: ent.id,
                },
                data: {
                  ...exclude(ent, ["id"]),
                  resumeId: upsertedResume.id,
                },
              })
        ) || []
      );

      const upsertedCompleteResume: CompleteResume =
        await getUniqueCompleteResume(upsertedResume.id);

      return NextResponse.json<CompleteResume>(upsertedCompleteResume);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
