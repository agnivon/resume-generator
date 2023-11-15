import { useSession } from "next-auth/react";

export default function useNextAuthSession() {
  const { data: session } = useSession();

  return { session, isAuthenticated: Boolean(session && session.user) };
}
