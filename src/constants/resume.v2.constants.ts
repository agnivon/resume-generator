import {
  CertificationV2,
  ContactV2,
  CourseV2,
  CustomSection,
  EducationV2,
  ExperienceV2,
  ProjectV2,
  ResumeV2,
  SkillV2,
} from "@prisma/client";

export const NEW_EXPERIENCE_V2 = (
  value: Partial<ExperienceV2>
): ExperienceV2 => {
  return {
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

export const NEW_PROJECT_V2 = (value: Partial<ProjectV2>): ProjectV2 => {
  return {
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

export const NEW_EDUCATION_V2 = (value: Partial<EducationV2>): EducationV2 => {
  return {
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

export const NEW_CERTIFICATION_V2 = (
  value: Partial<CertificationV2>
): CertificationV2 => {
  return {
    name: "",
    institution: "",
    year: "",
    relevance: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_COURSE_V2 = (value: Partial<CourseV2>): CourseV2 => {
  return {
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

export const NEW_SKILL_V2 = (value: Partial<SkillV2>): SkillV2 => {
  return {
    skill: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_CUSTOM_SECTION = (
  value: Partial<CustomSection>
): CustomSection => {
  return {
    name: "",
    content: "",
    hidden: false,
    displayOrder: 0,
    ...value,
  };
};

export const NEW_CONTACT_V2 = (value: Partial<ContactV2>): ContactV2 => {
  return {
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

export const NEW_RESUME_V2 = (
  value: Partial<ResumeV2>
): Omit<ResumeV2, "id"> => {
  return {
    name: "",
    userId: "",
    contact: null,
    experiences: [],
    projects: [],
    education: [],
    certifications: [],
    courses: [],
    skills: [],
    customSections: [],
    summary: "",
    domain: "",
    experienceLevel: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    tags: [],
    createdAt: new Date(),
    updatedAt: null,
    ...value,
  };
};
