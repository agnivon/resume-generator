import { resumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import * as Yup from "yup";

export const SummaryGenerationPayload = Yup.object().shape({
  jobTitle: resumeMetadataFormSchema.jobTitle,
  jobDescription: resumeMetadataFormSchema.jobDescription,
  useExperiences: Yup.boolean().default(false),
  useSkills: Yup.boolean().default(false),
});
