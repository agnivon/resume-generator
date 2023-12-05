import { OBJECT_ID_REGEX_STRING } from "@/utils/database.constants";

export const Routes = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNOUT: "/auth/signout",
  ERROR: "/auth/error",
  HOME: "/home",
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
