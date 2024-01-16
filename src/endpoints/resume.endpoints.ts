import {
  CompleteResume,
  Contact,
  Resume,
  ResumeEntity,
  ResumeEntityArray,
} from "@/types/resume.types";
import { ResumePreviewSettings, ResumeV2 } from "@prisma/client";
import axios from "axios";

export const getCompleteResumes = (): Promise<CompleteResume[]> =>
  axios
    .get<CompleteResume[]>("/api/resumes/complete")
    .then((result) => result.data);

export const getResumesV2 = (): Promise<ResumeV2[]> =>
  axios.get<ResumeV2[]>("/api/resumes/v2").then((result) => result.data);

export const getCompleteResumeById = (
  resumeId: string
): Promise<CompleteResume> =>
  axios
    .get<CompleteResume>(`/api/resume/v1/complete/${resumeId}`)
    .then((result) => result.data);

export const getResumeV2ById = (resumeId: string): Promise<ResumeV2> =>
  axios
    .get<ResumeV2>(`/api/resume/v2/${resumeId}`)
    .then((result) => result.data);

export const insertCompleteResume = (
  resume: CompleteResume
): Promise<CompleteResume> =>
  axios
    .post<CompleteResume>("/api/resume/v1/complete", resume)
    .then((result) => result.data);

export const insertResumeV2 = (resume: ResumeV2): Promise<ResumeV2> =>
  axios.post<ResumeV2>("/api/resume/v2", resume).then((result) => result.data);

export const upsertCompleteResume = (
  resume: Partial<CompleteResume> &
    Pick<CompleteResume, "id" | "name" | "userId">
): Promise<CompleteResume> =>
  axios
    .put<CompleteResume>("/api/resume/v1/complete", resume)
    .then((result) => result.data);

export const deleteCompleteResume = (id: String): Promise<CompleteResume> =>
  axios
    .delete<CompleteResume>(`/api/resume/v1/complete/${id}`)
    .then((result) => result.data);

export const deleteResumeV2 = (id: String): Promise<ResumeV2> =>
  axios.delete<ResumeV2>(`/api/resume/v2/${id}`).then((result) => result.data);

export const updateResume = (
  resumeId: string,
  resume: Resume
): Promise<Resume> =>
  axios
    .patch<Resume>(`/api/resume/v1/${resumeId}`, resume)
    .then((result) => result.data);

export const updateResumeV2 = (
  resumeId: string,
  resume: Partial<ResumeV2>
): Promise<ResumeV2> =>
  axios
    .put<ResumeV2>(`/api/resume/v2/${resumeId}`, resume)
    .then((result) => result.data);

export const upsertContact = (
  resumeId: string,
  contact: Contact
): Promise<Contact> =>
  axios
    .put<Contact>(`/api/resume/v1/${resumeId}/contact`, contact)
    .then((result) => result.data);

export const upsertResumeEntityById = <T extends ResumeEntityArray>(
  resumeId: string,
  entities: T,
  path: string
): Promise<T> =>
  axios
    .put<T>(`/api/resume/v1/${resumeId}/${path}`, entities)
    .then((result) => result.data);

export const deleteResumeEntityById = <T extends ResumeEntity>(
  resumeId: string,
  id: string,
  path: string
): Promise<T> =>
  axios
    .delete<T>(`/api/resume/v1/${resumeId}/${path}?id=${id}`)
    .then((result) => result.data);

export const getPreviewSettings = (): Promise<ResumePreviewSettings[]> =>
  axios
    .get<ResumePreviewSettings[]>(`/api/resume/preview-settings`)
    .then((result) => result.data);

export const getPreviewSettingsByResumeId = (
  resumeId: string
): Promise<ResumePreviewSettings | null> =>
  axios
    .get<ResumePreviewSettings | null>(
      `/api/resume/v1/${resumeId}/preview-settings`
    )
    .then((result) => result.data);

export const upsertPreviewSettings = (
  resumeId: string,
  previewSettings: Omit<ResumePreviewSettings, "id" | "resumeId">
): Promise<ResumePreviewSettings> =>
  axios
    .put<ResumePreviewSettings>(
      `/api/resume/v1/${resumeId}/preview-settings`,
      previewSettings
    )
    .then((result) => result.data);
