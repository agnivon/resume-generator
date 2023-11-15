import { CompleteResume, Resume } from "@/types/resume.types";

export const getResumeFromCompleteResume = (resume: CompleteResume): Resume => {
  return {
    id: resume.id,
    userId: resume.userId,
    name: resume.name,
    summary: resume.summary,
    createdOn: resume.createdOn,
  };
};

export const getResumeFromPartialCompleteResume = (
  resume: Partial<CompleteResume>
): Partial<Resume> => {
  return {
    id: resume.id,
    userId: resume.userId,
    name: resume.name,
    summary: resume.summary,
    createdOn: resume.createdOn,
  };
};
