import { getProviders } from "next-auth/react";
import ErrorCard from "../feature/auth/ErrorCard";
import SignInCard from "../feature/auth/SignInCard";

export default async function SignInPage() {
  const providers = await getProviders();
  return (
    <div className="h-screen w-full flex flex-col gap-y-4 justify-center items-center">
      <ErrorCard />
      <SignInCard providers={providers} />
    </div>
  );
}
