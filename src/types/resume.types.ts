import {
  CertificationSchema,
  ContactSchema,
  CourseSchema,
  EducationSchema,
  ExperienceSchema,
  ProjectSchema,
  ResumeSchema,
  CompleteResumeSchema,
  SkillSchema,
} from "@/validation/schema/resume.schema";
import { InferType } from "yup";
import { TypeKeys } from "./utility.types";

export type CommonFields = {
  hidden: boolean;
  displayOrder: number;
};

export type Contact = InferType<typeof ContactSchema>;

export type Experience = InferType<typeof ExperienceSchema>;

export type Project = InferType<typeof ProjectSchema>;

export type Education = InferType<typeof EducationSchema>;

export type Certification = InferType<typeof CertificationSchema>;

export type Course = InferType<typeof CourseSchema>;

export type Skill = InferType<typeof SkillSchema>;

export type Summary = string;

export type Resume = InferType<typeof ResumeSchema>;

export type CompleteResume = InferType<typeof CompleteResumeSchema>;

export type ResumeEntityArray = CompleteResume[TypeKeys<CompleteResume, any[]>];

export type ResumeEntity = CompleteResume[TypeKeys<
  CompleteResume,
  any[]
>][number];

export type ResumeEntityArrayKeys = TypeKeys<CompleteResume, any[]>;
