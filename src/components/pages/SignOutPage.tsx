import { Routes } from "@/constants/routes.constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignOutCard from "../feature/auth/SignOutCard";

export default async function SignOutPage() {
  const session = await getServerSession();
  if (!session) redirect(Routes.SIGNIN);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <SignOutCard />
    </div>
  );
}
