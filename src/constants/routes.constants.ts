export const Routes = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNOUT: "/api/auth/signout",
  HOME: "/home",
  RESUME: "/resume",
  RESUME_WITH_ID: (id: string) => `/resume/${id}`,
};
