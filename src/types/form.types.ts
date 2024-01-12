import { ResumeV2 } from "@prisma/client";
import { CompleteResume } from "./resume.types";

export type ResumeFormValues = {
  resume: ResumeV2;
};
