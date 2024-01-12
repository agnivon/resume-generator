import { authOptions } from "@/config/auth.config";
import { Session, getServerSession } from "next-auth";

export const isAuthenticated = (
  session: Session | null | undefined
): session is Session => Boolean(session && session.user);

export const getNextAuthServerSession = () => getServerSession(authOptions);
