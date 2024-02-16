import { ResumePreviewSettings } from ".prisma/client";
import {
  Certification,
  CompleteResume,
  Contact,
  Course,
  Education,
  Experience,
  Project,
  Resume,
  Skill,
} from "@/types/resume.types";
import {
  getResumeFromCompleteResume,
  getResumeFromPartialCompleteResume,
} from "@/utils/resume.utils";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ResumeTag, ResumeV2 } from "@prisma/client";

const resumeAdapter = createEntityAdapter<Resume>({
  selectId: (resume) => resume.id,
  sortComparer: (a, b) => a.createdOn - b.createdOn,
});

const resumeV2Adapter = createEntityAdapter<ResumeV2>({
  selectId: (resume) => resume.id,
  sortComparer: (a, b) =>
    new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
});

const contactAdapter = createEntityAdapter<Contact>({
  selectId: (contact) => contact.id,
});

const experienceAdapter = createEntityAdapter<Experience>({
  selectId: (experience) => experience.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const projectAdapter = createEntityAdapter<Project>({
  selectId: (project) => project.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const educationAdapter = createEntityAdapter<Education>({
  selectId: (education) => education.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const certificationAdapter = createEntityAdapter<Certification>({
  selectId: (certification) => certification.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const courseAdapter = createEntityAdapter<Course>({
  selectId: (course) => course.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const skillAdapter = createEntityAdapter<Skill>({
  selectId: (skill) => skill.id,
  sortComparer: (a, b) => a.displayOrder - b.displayOrder,
});

const resumeTagsAdapter = createEntityAdapter<ResumeTag>({
  selectId: (tag) => tag.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
});

const previewSettingsAdapter = createEntityAdapter<ResumePreviewSettings>({
  selectId: (settings) => settings.resumeId,
});

const initialState = {
  resumes: resumeAdapter.getInitialState(),
  resumeV2s: resumeV2Adapter.getInitialState(),
  contacts: contactAdapter.getInitialState(),
  experiences: experienceAdapter.getInitialState(),
  projects: projectAdapter.getInitialState(),
  education: educationAdapter.getInitialState(),
  certifications: certificationAdapter.getInitialState(),
  courses: courseAdapter.getInitialState(),
  skills: skillAdapter.getInitialState(),
  tags: resumeTagsAdapter.getInitialState(),
  previewSettings: previewSettingsAdapter.getInitialState(),
};

const getEntityIdsFromResumeIds = (
  resumeId: string,
  state: typeof initialState,
  entity: keyof typeof initialState
) => {
  return Object.values(state[entity].entities)
    .filter((e) => e.id === resumeId)
    .map((e) => e.id) as string[];
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    insertOneCompleteResume: (state, action: PayloadAction<CompleteResume>) => {
      resumeAdapter.addOne(
        state.resumes,
        getResumeFromCompleteResume(action.payload)
      );
      const {
        contact,
        experiences,
        projects,
        education,
        certifications,
        courses,
        skills,
      } = action.payload;
      if (contact) contactAdapter.addOne(state.contacts, contact);
      experienceAdapter.addMany(state.experiences, experiences);
      projectAdapter.addMany(state.projects, projects);
      educationAdapter.addMany(state.education, education);
      certificationAdapter.addMany(state.certifications, certifications);
      courseAdapter.addMany(state.courses, courses);
      skillAdapter.addMany(state.skills, skills);
    },
    updateOneCompleteResume: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<CompleteResume> }>
    ) => {
      resumeAdapter.updateOne(state.resumes, {
        id: action.payload.id,
        changes: getResumeFromPartialCompleteResume(action.payload),
      });
      const {
        contact,
        experiences,
        projects,
        education,
        certifications,
        courses,
        skills,
      } = action.payload.changes;
      if (contact) contactAdapter.upsertOne(state.contacts, contact);
      if (experiences)
        experienceAdapter.upsertMany(state.experiences, experiences);
      if (projects) projectAdapter.upsertMany(state.projects, projects);
      if (education) educationAdapter.upsertMany(state.education, education);
      if (certifications)
        certificationAdapter.upsertMany(state.certifications, certifications);
      if (courses) courseAdapter.upsertMany(state.courses, courses);
      if (skills) skillAdapter.upsertMany(state.skills, skills);
    },
    upsertOneCompleteResume: (state, action: PayloadAction<CompleteResume>) => {
      resumeAdapter.upsertOne(
        state.resumes,
        getResumeFromCompleteResume(action.payload)
      );
      const {
        contact,
        experiences,
        projects,
        education,
        certifications,
        courses,
        skills,
      } = action.payload;
      if (contact) contactAdapter.upsertOne(state.contacts, contact);
      experienceAdapter.upsertMany(state.experiences, experiences);
      projectAdapter.upsertMany(state.projects, projects);
      educationAdapter.upsertMany(state.education, education);
      certificationAdapter.upsertMany(state.certifications, certifications);
      courseAdapter.upsertMany(state.courses, courses);
      skillAdapter.upsertMany(state.skills, skills);
    },
    upsertManyCompleteResumes: (
      state,
      action: PayloadAction<CompleteResume[]>
    ) => {
      resumeAdapter.upsertMany(
        state.resumes,
        action.payload.map((completeResume) =>
          getResumeFromCompleteResume(completeResume)
        )
      );
      action.payload.forEach((resume) => {
        const {
          contact,
          experiences,
          projects,
          education,
          certifications,
          courses,
          skills,
        } = resume;
        if (contact) contactAdapter.upsertOne(state.contacts, contact);
        experienceAdapter.upsertMany(state.experiences, experiences);
        projectAdapter.upsertMany(state.projects, projects);
        educationAdapter.upsertMany(state.education, education);
        certificationAdapter.upsertMany(state.certifications, certifications);
        courseAdapter.upsertMany(state.courses, courses);
        skillAdapter.upsertMany(state.skills, skills);
      });
    },
    deleteOneCompleteResume: (state, action: PayloadAction<string>) => {
      resumeAdapter.removeOne(state.resumes, action.payload);
      contactAdapter.removeMany(
        state.contacts,
        getEntityIdsFromResumeIds(action.payload, state, "contacts")
      );
      experienceAdapter.removeMany(
        state.experiences,
        getEntityIdsFromResumeIds(action.payload, state, "experiences")
      );
      projectAdapter.removeMany(
        state.projects,
        getEntityIdsFromResumeIds(action.payload, state, "projects")
      );
      educationAdapter.removeMany(
        state.education,
        getEntityIdsFromResumeIds(action.payload, state, "education")
      );
      certificationAdapter.removeMany(
        state.certifications,
        getEntityIdsFromResumeIds(action.payload, state, "certifications")
      );
      courseAdapter.removeMany(
        state.courses,
        getEntityIdsFromResumeIds(action.payload, state, "courses")
      );
      skillAdapter.removeMany(
        state.skills,
        getEntityIdsFromResumeIds(action.payload, state, "skills")
      );
    },
    upsertOneResume: (state, action: PayloadAction<Resume>) => {
      resumeAdapter.upsertOne(state.resumes, action.payload);
    },
    updateOneResume: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Resume> }>
    ) => {
      resumeAdapter.updateOne(state.resumes, action.payload);
    },
    upsertManyResumes: (state, action: PayloadAction<Resume[]>) => {
      resumeAdapter.upsertMany(state.resumes, action.payload);
    },
    deleteOneResume: (state, action: PayloadAction<string>) => {
      resumeAdapter.removeOne(state.resumes, action.payload);
    },
    // Resume V2
    upsertOneResumeV2: (state, action: PayloadAction<ResumeV2>) => {
      resumeV2Adapter.upsertOne(state.resumeV2s, action.payload);
    },
    updateOneResumeV2: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ResumeV2> }>
    ) => {
      resumeV2Adapter.updateOne(state.resumeV2s, action.payload);
    },
    upsertManyResumeV2s: (state, action: PayloadAction<ResumeV2[]>) => {
      resumeV2Adapter.upsertMany(state.resumeV2s, action.payload);
    },
    deleteOneResumeV2: (state, action: PayloadAction<string>) => {
      resumeV2Adapter.removeOne(state.resumeV2s, action.payload);
    },
    // UpsertOne, UpsertMany, and DeleteOne for Contact
    upsertOneContact: (state, action: PayloadAction<Contact>) => {
      contactAdapter.upsertOne(state.contacts, action.payload);
    },
    upsertManyContacts: (state, action: PayloadAction<Contact[]>) => {
      contactAdapter.upsertMany(state.contacts, action.payload);
    },
    deleteOneContact: (state, action: PayloadAction<string>) => {
      contactAdapter.removeOne(state.contacts, action.payload);
    },

    // UpsertOne, UpsertMany, and DeleteOne for Experience
    upsertOneExperience: (state, action: PayloadAction<Experience>) => {
      experienceAdapter.upsertOne(state.experiences, action.payload);
    },
    upsertManyExperiences: (state, action: PayloadAction<Experience[]>) => {
      experienceAdapter.upsertMany(state.experiences, action.payload);
    },
    deleteOneExperience: (state, action: PayloadAction<string>) => {
      experienceAdapter.removeOne(state.experiences, action.payload);
    },
    // UpsertOne, UpsertMany, and DeleteOne for Project
    upsertOneProject: (state, action: PayloadAction<Project>) => {
      projectAdapter.upsertOne(state.projects, action.payload);
    },
    upsertManyProjects: (state, action: PayloadAction<Project[]>) => {
      projectAdapter.upsertMany(state.projects, action.payload);
    },
    deleteOneProject: (state, action: PayloadAction<string>) => {
      projectAdapter.removeOne(state.projects, action.payload);
    },

    // UpsertOne, UpsertMany, and DeleteOne for Education
    upsertOneEducation: (state, action: PayloadAction<Education>) => {
      educationAdapter.upsertOne(state.education, action.payload);
    },
    upsertManyEducations: (state, action: PayloadAction<Education[]>) => {
      educationAdapter.upsertMany(state.education, action.payload);
    },
    deleteOneEducation: (state, action: PayloadAction<string>) => {
      educationAdapter.removeOne(state.education, action.payload);
    },

    // UpsertOne, UpsertMany, and DeleteOne for Certification
    upsertOneCertification: (state, action: PayloadAction<Certification>) => {
      certificationAdapter.upsertOne(state.certifications, action.payload);
    },
    upsertManyCertifications: (
      state,
      action: PayloadAction<Certification[]>
    ) => {
      certificationAdapter.upsertMany(state.certifications, action.payload);
    },
    deleteOneCertification: (state, action: PayloadAction<string>) => {
      certificationAdapter.removeOne(state.certifications, action.payload);
    },

    // UpsertOne, UpsertMany, and DeleteOne for Course
    upsertOneCourse: (state, action: PayloadAction<Course>) => {
      courseAdapter.upsertOne(state.courses, action.payload);
    },
    upsertManyCourses: (state, action: PayloadAction<Course[]>) => {
      courseAdapter.upsertMany(state.courses, action.payload);
    },
    deleteOneCourse: (state, action: PayloadAction<string>) => {
      courseAdapter.removeOne(state.courses, action.payload);
    },

    // UpsertOne, UpsertMany, and DeleteOne for Skill
    upsertOneSkill: (state, action: PayloadAction<Skill>) => {
      skillAdapter.upsertOne(state.skills, action.payload);
    },
    upsertManySkills: (state, action: PayloadAction<Skill[]>) => {
      skillAdapter.upsertMany(state.skills, action.payload);
    },
    deleteOneSkill: (state, action: PayloadAction<string>) => {
      skillAdapter.removeOne(state.skills, action.payload);
    },
    // Resume Tag
    upsertOneResumeTag: (state, action: PayloadAction<ResumeTag>) => {
      resumeTagsAdapter.upsertOne(state.tags, action.payload);
    },
    upsertManyResumeTags: (state, action: PayloadAction<ResumeTag[]>) => {
      resumeTagsAdapter.upsertMany(state.tags, action.payload);
    },
    deleteOneResumeTag: (state, action: PayloadAction<string>) => {
      resumeTagsAdapter.removeOne(state.tags, action.payload);
    },
    upsertOnePreviewSetting: (
      state,
      action: PayloadAction<ResumePreviewSettings>
    ) => {
      previewSettingsAdapter.upsertOne(state.previewSettings, action.payload);
    },
    upsertManyPreviewSettings: (
      state,
      action: PayloadAction<ResumePreviewSettings[]>
    ) => {
      previewSettingsAdapter.upsertMany(state.previewSettings, action.payload);
    },
    deleteOnePreviewSetting: (state, action: PayloadAction<string>) => {
      previewSettingsAdapter.removeOne(state.previewSettings, action.payload);
    },
  },
});

export const selectPreviewSettingByResumeId =
  (id: string) => (state: RootState) =>
    state.resume.previewSettings.entities[id];

export const resumeTagSelectors = resumeTagsAdapter.getSelectors();

export default resumeSlice;
