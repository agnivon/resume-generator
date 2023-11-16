export const Routes = {
  ROOT: "/",
  SIGNIN: "/auth/signin",
  SIGNOUT: "/auth/signout",
  HOME: "/home",
  RESUME: "/resume",
  RESUME_WITH_ID: (id: string) => `/resume/${id}`,
};
