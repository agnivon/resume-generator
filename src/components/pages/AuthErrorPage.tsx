"use client";

import { redirect, useSearchParams } from "next/navigation";
import ErrorMessage from "../global/ErrorMessage";
import { Routes } from "@/constants/routes.constants";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");
  console.log(error);
  if (!error) redirect(Routes.ROOT);
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-y-2">
      <ErrorMessage message={error} />
    </div>
  );
}
