import { ResumeV2 } from "@prisma/client";

export const getResumeSummaryPrompt = ({
  resume,
  jobTitle,
  jobDescription,
  useExperiences,
  useSkills,
}: {
  resume: ResumeV2;
  jobTitle: string;
  jobDescription: string;
  useExperiences: boolean;
  useSkills: boolean;
}) => {
  let prompt =
    "Write a professional summary that includes metrics and total years of experience, and keep it shorter than or equal to 5 sentences.\n";
  if (jobTitle) prompt += `Job Title: ${jobTitle}\n`;
  if (jobDescription) prompt += `Job Description: ${jobDescription}\n`;
  if (useExperiences)
    prompt += `Experiences: ${JSON.stringify(resume.experiences)}\n`;
  if (useSkills) prompt += `Skills: ${JSON.stringify(resume.skills)}\n`;

  return prompt;
};
