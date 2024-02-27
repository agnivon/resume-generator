import { START_END_DATE_FORMAT } from "@/constants/date.constants";
import {
  DESCRIPTION_LENGTH,
  SKILL_LENGTH,
  SUMMARY_LENGTH,
} from "@/constants/schema.constants";
import { ResumeFormTab } from "@/constants/state.constants";
import moment from "moment";
import * as Yup from "yup";

const keys = {
  id: Yup.string().ensure(),
  resumeId: Yup.string().ensure(),
};

export const commonFields = {
  hidden: Yup.boolean().default(false),
  displayOrder: Yup.number().default(0),
};

export const ContactFormSchema = Yup.object().shape({
  ...keys,
  fullName: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  email: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  phone: Yup.string()
    .required("This field is required")
    .max(20, "Max 20 characters allowed"),
  linkedinUrl: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  personalUrl: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  country: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  state: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  city: Yup.string().ensure().max(100, "Max 100 characters allowed"),
});

export const ExperienceFormSchema = Yup.object().shape({
  ...keys,
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
    .ensure()
    .when("currentlyWorking", {
      is: false,
      then: (schema) => schema.required("This field is required"),
    }),
  companyLocation: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  description: Yup.string()
    .ensure()
    .max(DESCRIPTION_LENGTH, `Max ${DESCRIPTION_LENGTH} characters allowed`),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const ProjectFormSchema = Yup.object().shape({
  ...keys,
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
    .ensure()
    .when("currentlyWorking", {
      is: false,
      then: (schema) => schema.required("This field is required"),
    }),
  url: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  description: Yup.string()
    .ensure()
    .max(DESCRIPTION_LENGTH, `Max ${DESCRIPTION_LENGTH} characters allowed`),
  currentlyWorking: Yup.boolean().default(false),
  ...commonFields,
});

export const EducationFormSchema = Yup.object().shape({
  ...keys,
  major: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  location: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string().ensure().max(4, "Max 4 characters allowed"),
  minor: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  gpa: Yup.string().ensure().max(5, "Max 5 characters allowed"),
  additionalInfo: Yup.string().ensure().max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const CertificationFormSchema = Yup.object().shape({
  ...keys,
  name: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string()
    .required("This field is required")
    .max(4, "Max 4 characters allowed"),
  relevance: Yup.string().ensure().max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const CourseFormSchema = Yup.object().shape({
  ...keys,
  name: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  institution: Yup.string()
    .required("This field is required")
    .max(100, "Max 100 characters allowed"),
  year: Yup.string()
    .required("This field is required")
    .max(4, "Max 4 characters allowed"),
  skills: Yup.string().ensure().max(100, "Max 100 characters allowed"),
  applications: Yup.string().ensure().max(250, "Max 250 characters allowed"),
  ...commonFields,
});

export const SkillFormSchema = Yup.object().shape({
  ...keys,
  skill: Yup.string()
    .required("This field is required")
    .max(SKILL_LENGTH, `Max ${SKILL_LENGTH} characters allowed`),
  ...commonFields,
});

const resumeFormSchema = {
  id: Yup.string().required("Id is required"),
  userId: Yup.string().required(),
  name: Yup.string().required("Resume name is required"),
  createdOn: Yup.number()
    .default(Date.now())
    .positive("Please enter a valid value"),
  summary: Yup.string()
    .required("Resume summary is required")
    .max(SUMMARY_LENGTH, `Max ${SUMMARY_LENGTH} characters allowed`),
};

const resumeFormEntitiesSchema = {
  contact: ContactFormSchema.required(),
  experiences: Yup.array(ExperienceFormSchema).defined(),
  projects: Yup.array(ProjectFormSchema).defined(),
  education: Yup.array(EducationFormSchema).defined(),
  certifications: Yup.array(CertificationFormSchema).defined(),
  courses: Yup.array(CourseFormSchema).defined(),
  skills: Yup.array(SkillFormSchema).defined(),
};

const completeResumeFormSchema = {
  ...resumeFormSchema,
  ...resumeFormEntitiesSchema,
};

export const CompleteResumeFormSchema = Yup.object().shape({
  resume: Yup.object().shape(completeResumeFormSchema),
});

/* export const getResumeFormSchema = (tab: ResumeFormTab) =>
  Yup.object().shape({
    resume: Yup.object().shape({
      [tab]: completeResumeFormSchema[tab],
    }),
  }); */
