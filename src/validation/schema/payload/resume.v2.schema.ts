import {
  JOB_DESCRIPTION,
  RESUME_TAG_NAME_LENGTH,
  SUMMARY_LENGTH,
} from "@/constants/schema.constants";
import * as Yup from "yup";
import {
  CertificationFormSchema,
  ContactFormSchema,
  CourseFormSchema,
  CustomSectionFormSchema,
  EducationFormSchema,
  ExperienceFormSchema,
  ProjectFormSchema,
  SkillFormSchema,
} from "../form/resume.form.v2.schema";

export const NewContactSchema = Yup.object().shape({
  fullName: Yup.string().default("").max(100),
  email: Yup.string().default("").max(100),
  phone: Yup.string().default("").max(20),
  linkedinUrl: Yup.string().default("").max(100),
  personalUrl: Yup.string().default("").max(100),
  country: Yup.string().default("").max(100),
  state: Yup.string().default("").max(100),
  city: Yup.string().default("").max(100),
});

export const NewResumeV2Schema = Yup.object().shape({
  userId: Yup.string().required().max(64),
  name: Yup.string().required().max(50),
  domain: Yup.string().default("").max(50),
  experienceLevel: Yup.string().default("").max(50),
  jobTitle: Yup.string().default("").max(100),
  companyName: Yup.string().default("").max(100),
  jobDescription: Yup.string().default("").max(JOB_DESCRIPTION),
  summary: Yup.string().max(SUMMARY_LENGTH).default(""),
  contact: NewContactSchema.nullable(),
  experiences: Yup.array(ExperienceFormSchema).defined(),
  projects: Yup.array(ProjectFormSchema).defined(),
  education: Yup.array(EducationFormSchema).defined(),
  certifications: Yup.array(CertificationFormSchema).defined(),
  courses: Yup.array(CourseFormSchema).defined(),
  skills: Yup.array(SkillFormSchema).defined(),
  customSections: Yup.array(CustomSectionFormSchema).defined(),
  tags: Yup.array(Yup.string().defined().max(RESUME_TAG_NAME_LENGTH))
    .defined()
    .max(25),
});

export const ResumeV2PartialSchema = Yup.object().shape({
  //id: Yup.string(),
  userId: Yup.string().max(64),
  name: Yup.string().max(50),
  domain: Yup.string().max(50),
  experienceLevel: Yup.string().max(50),
  jobTitle: Yup.string().max(100),
  companyName: Yup.string().max(100),
  jobDescription: Yup.string().max(JOB_DESCRIPTION),
  summary: Yup.string().max(SUMMARY_LENGTH),
  contact: ContactFormSchema.default(undefined),
  experiences: Yup.array(ExperienceFormSchema),
  projects: Yup.array(ProjectFormSchema),
  education: Yup.array(EducationFormSchema),
  certifications: Yup.array(CertificationFormSchema),
  courses: Yup.array(CourseFormSchema),
  skills: Yup.array(SkillFormSchema),
  customSections: Yup.array(CustomSectionFormSchema),
  tags: Yup.array(Yup.string().defined().max(RESUME_TAG_NAME_LENGTH)).max(25),
});
