import { CompleteResume, Resume } from "@/types/resume.types";

export const getResumeFromCompleteResume = (resume: CompleteResume): Resume => {
  return {
    id: resume.id,
    userId: resume.userId,
    name: resume.name,
    summary: resume.summary,
    domain: resume.domain,
    experienceLevel: resume.experienceLevel,
    jobTitle: resume.jobTitle,
    companyName: resume.companyName,
    jobDescription: resume.jobDescription,
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
    domain: resume.domain,
    experienceLevel: resume.experienceLevel,
    jobTitle: resume.jobTitle,
    companyName: resume.companyName,
    jobDescription: resume.jobDescription,
    createdOn: resume.createdOn,
  };
};
