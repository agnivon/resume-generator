import {
  CompleteResume,
  Resume,
  ResumeEntity,
  ResumeEntityArrayKeys,
} from "@/types/resume.types";
import { ResumePreviewSettings } from "@prisma/client";
import _ from "lodash";

export const getSetQueryDataForCompleteResumes =
  (data: CompleteResume) => (oldResumes: CompleteResume[] | undefined) => {
    if (oldResumes) {
      const resumes = _.cloneDeep(oldResumes);
      const index = resumes.findIndex((resume) => resume.id === data.id);
      if (index > -1) {
        resumes[index] = data;
      } else {
        resumes.unshift(data);
      }
      return resumes;
    }
    return oldResumes;
  };

export const getSetQueryDataForCompleteResumeById =
  (data: CompleteResume) => (oldResume: CompleteResume | undefined) => {
    if (oldResume) {
      return data;
    }
    return oldResume;
  };

export const getSetQueryDataForDeleteCompleteResumes =
  (id: string) => (oldResumes: CompleteResume[] | undefined) => {
    if (oldResumes) {
      const resumes = _.cloneDeep(oldResumes);
      const index = resumes.findIndex((resume) => resume.id === id);
      if (index > -1) {
        resumes.splice(index, 1);
      }
      return resumes;
    }
    return oldResumes;
  };

export const getSetQueryDataForResumes =
  (data: Resume) => (oldResumes: CompleteResume[] | undefined) => {
    if (oldResumes) {
      const resumes = _.cloneDeep(oldResumes);
      const index = resumes.findIndex((resume) => resume.id === data.id);
      if (index > -1) {
        resumes[index] = { ...resumes[index], ...data };
      }
      return resumes;
    }
    return oldResumes;
  };

export const getSetQueryDataForResumeById =
  (data: Resume) => (oldResume: CompleteResume | undefined) => {
    if (oldResume) {
      return { ...oldResume, ...data };
    }
    return oldResume;
  };

// Supports contact
export const getSetQueryDataForEntities =
  <
    T extends CompleteResume[keyof CompleteResume],
    U extends { resumeId: string }
  >(
    data: T,
    variables: U,
    entity: keyof CompleteResume
  ) =>
  (oldResumes: CompleteResume[] | undefined) => {
    if (oldResumes) {
      const resumes = _.cloneDeep(oldResumes);
      const resume = resumes.find((resume) => resume.id === variables.resumeId);
      if (resume) {
        (resume[entity] as T) = data;
      }
      return resumes;
    }
    return oldResumes;
  };

// Supports contact
export const getSetQueryDataForEntityByResumeId =
  <
    T extends CompleteResume[keyof CompleteResume],
    U extends { resumeId: string }
  >(
    data: T,
    _variables: U,
    entity: keyof CompleteResume
  ) =>
  (oldResume: CompleteResume | undefined) => {
    if (oldResume) {
      const resume = _.cloneDeep(oldResume);
      (resume[entity] as T) = data;
      return resume;
    }
    return oldResume;
  };

export const getSetQueryDataForDeleteEntities =
  <T extends ResumeEntity, U extends { resumeId: string }>(
    data: T,
    variables: U,
    entity: ResumeEntityArrayKeys
  ) =>
  (oldResumes: CompleteResume[] | undefined) => {
    if (oldResumes) {
      const resumes = _.cloneDeep(oldResumes);
      const resume = resumes.find((resume) => resume.id === variables.resumeId);
      if (resume) {
        const index = resume[entity].findIndex(
          (entity) => entity.id === data.id
        );
        if (index > -1) {
          resume[entity].splice(index, 1);
        }
      }
      return resumes;
    }
    return oldResumes;
  };

export const getSetQueryDataForDeleteEntityByResumeId =
  <T extends ResumeEntity, U extends { resumeId: string }>(
    data: T,
    _variables: U,
    entity: ResumeEntityArrayKeys
  ) =>
  (oldResume: CompleteResume | undefined) => {
    if (oldResume) {
      const resume = _.cloneDeep(oldResume);
      if (resume) {
        const index = resume[entity].findIndex(
          (entity) => entity.id === data.id
        );
        if (index > -1) {
          resume[entity].splice(index, 1);
        }
      }
      return resume;
    }
    return oldResume;
  };

export const getSetQueryDataForPreviewSettings = (
  data: ResumePreviewSettings
) => {
  (oldPreviewSettings: ResumePreviewSettings[] | undefined) => {
    if (oldPreviewSettings) {
      const previewSettings = _.cloneDeep(oldPreviewSettings);
      const index = previewSettings.findIndex((s) => data.id);
      if (index > -1) {
        previewSettings[index] = data;
      }
      return previewSettings;
    } else return oldPreviewSettings;
  };
};
