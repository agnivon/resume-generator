import { Session } from "next-auth";

export const isAuthenticated = (
  session: Session | null | undefined
): session is Session => Boolean(session && session?.user);
