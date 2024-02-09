import { START_END_DATE_FORMAT } from "@/constants/date.constants";
import {
  DESCRIPTION_LENGTH,
  JOB_DESCRIPTION,
  SKILL_LENGTH,
  SUMMARY_LENGTH,
} from "@/constants/schema.constants";
import { ResumeFormTab } from "@/constants/state.constants";
import moment from "moment";
import * as Yup from "yup";

export const commonFields = {
  hidden: Yup.boolean().default(false),
  displayOrder: Yup.number().default(0),
};

export const ContactFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  email: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  phone: Yup.string()
    .required("This field is required")
    .max(20, "Max 20 characters allowed"),
  linkedinUrl: Yup.string().default("").max(100, "Max 100 characters allowed"),
  personalUrl: Yup.string().default("").max(100, "Max 100 characters allowed"),
  country: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  state: Yup.string().default("").max(100, "Max 100 characters allowed"),
  city: Yup.string().default("").max(100, "Max 100 characters allowed"),
});

export const ExperienceFormSchema = Yup.object().shape({
  role: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  companyName: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  startDate: Yup.string()
    .required("This field is required")
    .test("isValidDate", "Invalid Date", (value, context) => {
      const currentlyWorking = context.parent.currentlyWorking;

      if (context.parent.endDate && !currentlyWorking) {
        const startDate = moment(value, START_END_DATE_FORMAT);
        const endDate = moment(context.parent.endDate, START_END_DATE_FORMAT);
        return startDate.isSameOrBefore(endDate);
      }
      return true;
    })
    .max(25),
  endDate: Yup.string()
    .max(25)
    .default("")
    .when("currentlyWorking", {
      is: false,
      then: (schema) => schema.required("This field is required"),
    }),
  companyLocation: Yup.string()
    .default("")
    .max(100, "Max 100 characters allowed"),
  description: Yup.string()
    .default("")
    .max(DESCRIPTION_LENGTH, `Max ${DESCRIPTION_LENGTH} characters allowed`),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const ProjectFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  organization: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  startDate: Yup.string()
    .required("This field is required")
    .test("isValidDate", "Invalid Date", (value, context) => {
      const currentlyWorking = context.parent.currentlyWorking;

      if (context.parent.endDate && !currentlyWorking) {
        const startDate = moment(value, START_END_DATE_FORMAT);
        const endDate = moment(context.parent.endDate, START_END_DATE_FORMAT);
        return startDate.isSameOrBefore(endDate);
      }
      return true;
    })
    .max(25),
  endDate: Yup.string()
    .max(25)
    .default("")
    .when("currentlyWorking", {
      is: false,
      then: (schema) => schema.required("This field is required"),
    }),
  url: Yup.string().default("").max(100, "Max 100 characters allowed"),
  description: Yup.string()
    .default("")
    .max(DESCRIPTION_LENGTH, `Max ${DESCRIPTION_LENGTH} characters allowed`),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const EducationFormSchema = Yup.object().shape({
  major: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  location: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string().default("").max(4, "Max 4 characters allowed"),
  minor: Yup.string().default("").max(100, "Max 100 characters allowed"),
  gpa: Yup.string().default("").max(5, "Max 5 characters allowed"),
  additionalInfo: Yup.string()
    .default("")
    .max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const CertificationFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string()
    .required("This field is required")
    .max(4, "Max 4 characters allowed"),
  relevance: Yup.string().default("").max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const CourseFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string()
    .required("This field is required")
    .max(4, "Max 4 characters allowed"),
  skills: Yup.string().default("").max(100, "Max 100 characters allowed"),
  applications: Yup.string().default("").max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const SkillFormSchema = Yup.object().shape({
  skill: Yup.string()
    .required("This field is required")
    .max(SKILL_LENGTH, `Max ${SKILL_LENGTH} characters allowed`),
  ...commonFields,
});

export const resumeMetadataFormSchema = {
  //id: Yup.string().required("Id is required"),
  //userId: Yup.string().required(),
  name: Yup.string()
    .required("Resume name is required")
    .max(50, "Max 50 characters allowed"),
  /* createdOn: Yup.number()
    .default(Date.now())
    .positive("Please enter a valid value"), */
  domain: Yup.string().default("").max(50, "Max 50 characters allowed"),
  experienceLevel: Yup.string()
    .max(50, "Max 50 characters allowed")
    .default(""),
  jobTitle: Yup.string().max(100, "Max 100 characters allowed").default(""),
  companyName: Yup.string().max(100, "Max 100 characters allowed").default(""),
  jobDescription: Yup.string()
    .max(JOB_DESCRIPTION, `Max ${JOB_DESCRIPTION} characters allowed`)
    .default(""),
};

export const resumeFormSchema = {
  summary: Yup.string()
    .required("Resume summary is required")
    .max(SUMMARY_LENGTH, `Max ${SUMMARY_LENGTH} characters allowed`),
  contact: ContactFormSchema.required(),
  experiences: Yup.array(ExperienceFormSchema).defined(),
  projects: Yup.array(ProjectFormSchema).defined(),
  education: Yup.array(EducationFormSchema).defined(),
  certifications: Yup.array(CertificationFormSchema).defined(),
  courses: Yup.array(CourseFormSchema).defined(),
  skills: Yup.array(SkillFormSchema).defined(),
};

export const getResumeFormSchema = (tab: ResumeFormTab) =>
  Yup.object().shape({
    resume: Yup.object().shape({
      [tab]: resumeFormSchema[tab],
    }),
  });
