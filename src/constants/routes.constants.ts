export const Routes = {
  ROOT: "/",
  SIGNIN: "/api/auth/signin",
  SIGNOUT: "/api/auth/signout",
  HOME: "/home",
  RESUME: "/resume",
  RESUME_WITH_ID: (id: string) => `/resume/${id}`,
};
