import { Routes } from "@/constants/routes.constants";
import { getNextAuthServerSession } from "@/utils/session.utils";
import { redirect } from "next/navigation";
import SignOutCard from "../feature/auth/SignOutCard";

export default async function SignOutPage() {
  const session = await getNextAuthServerSession();
  if (!session) redirect(Routes.SIGNIN);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <SignOutCard />
    </div>
  );
}
