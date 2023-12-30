import prisma from "@/clients/prismaClient";

export async function getUniqueCompleteResume(resumeId: string) {
  return prisma.resume.findUniqueOrThrow({
    where: { id: resumeId },
    include: {
      contact: true,
      experiences: { orderBy: { displayOrder: "asc" } },
      projects: { orderBy: { displayOrder: "asc" } },
      education: { orderBy: { displayOrder: "asc" } },
      certifications: { orderBy: { displayOrder: "asc" } },
      courses: { orderBy: { displayOrder: "asc" } },
      skills: { orderBy: { displayOrder: "asc" } },
    },
  });
}

export async function deleteCompleteResume(resumeId: string) {
  return prisma.resume.delete({
    where: { id: resumeId },
    include: {
      contact: true,
      experiences: { orderBy: { displayOrder: "asc" } },
      projects: { orderBy: { displayOrder: "asc" } },
      education: { orderBy: { displayOrder: "asc" } },
      certifications: { orderBy: { displayOrder: "asc" } },
      courses: { orderBy: { displayOrder: "asc" } },
      skills: { orderBy: { displayOrder: "asc" } },
    },
  });
}
