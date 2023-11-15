import { Routes } from "@/constants/routes.constants";
import { redirect } from "next/navigation";

export default function Root() {
  redirect(Routes.HOME);
}
