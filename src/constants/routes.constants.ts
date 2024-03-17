import { OBJECT_ID_REGEX_STRING } from "@/constants/database.constants";

export const Routes = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNOUT: "/auth/signout",
  ERROR: "/auth/error",
  RESUMES: "/resumes",
  RESUME: "/resume",
  GET_RESUME_WITH_ID: (id: string) => `/resume/${id}`,
  GET_RESUME_PREVIEW_WITH_ID: (id: string) => `/resume/${id}/preview`,
};

export const SIDEBAR_HIDDEN_ROUTES = [
  new RegExp(`resume/${OBJECT_ID_REGEX_STRING}/preview`),
];

export const NAVBAR_HIDDEN_ROUTES = [
  new RegExp(`resume/${OBJECT_ID_REGEX_STRING}/preview`),
];

export const BLOCKED_ROUTES = [
  new RegExp(`^\/api\/resume\/v1\/[0-9a-fA-F]{24}(?!\/preview-settings)`),
  new RegExp(`^\/api\/resume\/v1\/complete`),
  new RegExp(`^\/api\/resumes\/v1`),
];

export const PUBLIC_ROUTES = [Routes.ROOT, Routes.SIGNIN, Routes.ERROR];
