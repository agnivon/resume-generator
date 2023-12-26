import {
  DESCRIPTION_LENGTH,
  SKILL_LENGTH,
  SUMMARY_LENGTH,
} from "@/constants/schema.constants";
import { ResumeFormTab } from "@/constants/state.constants";
import * as Yup from "yup";

const PHONE_REGEX =
  /^\+(?:\d{1,3})?\s?\(?\d{1,4}\)?[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,5}$/;

const keys = {
  id: Yup.string().ensure(),
  resumeId: Yup.string().ensure(),
};

export const commonFields = {
  hidden: Yup.boolean().default(false),
  displayOrder: Yup.number().default(0),
};

export const ContactSchema = Yup.object().shape({
  ...keys,
  fullName: Yup.string().ensure().max(100),
  email: Yup.string().ensure().max(100),
  phone: Yup.string().ensure().max(20),
  linkedinUrl: Yup.string().ensure().max(100),
  personalUrl: Yup.string().ensure().max(100),
  country: Yup.string().ensure().max(100),
  state: Yup.string().ensure().max(100),
  city: Yup.string().ensure().max(100),
});

export const ExperienceSchema = Yup.object().shape({
  ...keys,
  role: Yup.string().ensure().max(100),
  companyName: Yup.string().ensure().max(100),
  startDate: Yup.string().ensure().max(25),
  endDate: Yup.string().ensure().max(25),
  companyLocation: Yup.string().ensure().max(100),
  description: Yup.string().ensure().max(DESCRIPTION_LENGTH),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const ProjectSchema = Yup.object().shape({
  ...keys,
  title: Yup.string().ensure().max(100),
  organization: Yup.string().ensure().max(100),
  startDate: Yup.string().ensure().max(25),
  endDate: Yup.string().ensure().max(25),
  url: Yup.string().ensure().max(100),
  description: Yup.string().ensure().max(DESCRIPTION_LENGTH),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const EducationSchema = Yup.object().shape({
  ...keys,
  major: Yup.string().ensure().max(100),
  institution: Yup.string().ensure().max(100),
  location: Yup.string().ensure().max(100),
  year: Yup.string().ensure().max(4),
  minor: Yup.string().ensure().max(100),
  gpa: Yup.string().ensure().max(5),
  additionalInfo: Yup.string().ensure().max(250),
  ...commonFields,
});

export const CertificationSchema = Yup.object().shape({
  ...keys,
  name: Yup.string().ensure().max(100),
  institution: Yup.string().ensure().max(100),
  year: Yup.string().ensure().max(4),
  relevance: Yup.string().ensure().max(250),
  ...commonFields,
});

export const CourseSchema = Yup.object().shape({
  ...keys,
  name: Yup.string().ensure().max(100),
  institution: Yup.string().ensure().max(100),
  year: Yup.string().ensure().max(4),
  skills: Yup.string().ensure().max(100),
  applications: Yup.string().ensure().max(250),
  ...commonFields,
});

export const SkillSchema = Yup.object().shape({
  ...keys,
  skill: Yup.string().ensure().max(SKILL_LENGTH),
  ...commonFields,
});

const resumeSchema = {
  id: Yup.string().ensure(),
  userId: Yup.string().ensure(),
  name: Yup.string().ensure(),
  createdOn: Yup.number().defined(),
  summary: Yup.string().ensure().max(SUMMARY_LENGTH),
  domain: Yup.string().ensure(),
  experienceLevel: Yup.string().ensure(),
  jobTitle: Yup.string().ensure(),
  companyName: Yup.string().ensure(),
  jobDescription: Yup.string().ensure(),
};

const resumeEntitiesSchema = {
  contact: ContactSchema.nullable().defined(),
  experiences: Yup.array(ExperienceSchema).defined(),
  projects: Yup.array(ProjectSchema).defined(),
  education: Yup.array(EducationSchema).defined(),
  certifications: Yup.array(CertificationSchema).defined(),
  courses: Yup.array(CourseSchema).defined(),
  skills: Yup.array(SkillSchema).defined(),
};

export const ResumeSchema = Yup.object().shape({
  ...resumeSchema,
});

const completeResumeSchema = {
  ...resumeSchema,
  ...resumeEntitiesSchema,
};

export const CompleteResumeSchema = Yup.object().shape(completeResumeSchema);
