import { Routes } from "@/constants/routes.constants";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { redirect } from "next/navigation";
import SignInCard from "../feature/auth/SignInCard";
import { getProviders } from "next-auth/react";
import ErrorCard from "../feature/auth/ErrorCard";

export default async function SignInPage() {
  const session = await getNextAuthServerSession();
  if (isAuthenticated(session)) redirect(Routes.RESUMES);
  const providers = await getProviders();
  return (
    <div className="h-screen w-full flex flex-col gap-y-4 justify-center items-center">
      <ErrorCard />
      <SignInCard providers={providers} />
    </div>
  );
}
