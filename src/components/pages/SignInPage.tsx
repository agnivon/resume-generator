import { getProviders } from "next-auth/react";
import SignInCard from "../feature/auth/SignInCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Routes } from "@/constants/routes.constants";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) redirect(Routes.HOME);
  const providers = await getProviders();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <SignInCard providers={providers} />
    </div>
  );
}
