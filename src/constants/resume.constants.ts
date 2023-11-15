import {
  Certification,
  Contact,
  Course,
  Education,
  Experience,
  Project,
  CompleteResume,
  Skill,
} from "@/types/resume.types";

export const NEW_EXPERIENCE = (value: Partial<Experience>): Experience => {
  return {
    id: "",
    resumeId: "",
    role: "",
    companyName: "",
    companyLocation: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_PROJECT = (value: Partial<Project>): Project => {
  return {
    id: "",
    resumeId: "",
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    url: "",
    description: "",
    currentlyWorking: false,
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_EDUCATION = (value: Partial<Education>): Education => {
  return {
    id: "",
    resumeId: "",
    major: "",
    institution: "",
    location: "",
    year: "",
    minor: "",
    gpa: "",
    additionalInfo: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_CERTIFICATION = (
  value: Partial<Certification>
): Certification => {
  return {
    id: "",
    resumeId: "",
    name: "",
    institution: "",
    year: "",
    relevance: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_COURSE = (value: Partial<Course>): Course => {
  return {
    id: "",
    resumeId: "",
    name: "",
    institution: "",
    year: "",
    skills: "",
    applications: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_SKILL = (value: Partial<Skill>): Skill => {
  return {
    id: "",
    resumeId: "",
    skill: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_CONTACT = (value: Partial<Contact>): Contact => {
  return {
    id: "",
    resumeId: "",
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    personalUrl: "",
    country: "",
    state: "",
    city: "",
    ...value,
  };
};

export const NEW_RESUME = (value: Partial<CompleteResume>): CompleteResume => {
  return {
    id: "",
    name: "",
    userId: "",
    createdOn: Date.now(),
    contact: null,
    experiences: [],
    projects: [],
    education: [],
    certifications: [],
    courses: [],
    skills: [],
    summary: "",
    ...value,
  };
};
