import { Routes } from "@/constants/routes.constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RenderIf from "../global/RenderIf";
import Sidebar from "../feature/sidebar/Sidebar";
import { isAuthenticated } from "@/utils/session.utils";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  const authenticated = isAuthenticated(session);

  if (!authenticated) {
    redirect(Routes.SIGNIN);
  }
  return (
    <RenderIf isTrue={authenticated}>
      <Sidebar />
      <main className="min-h-screen w-full flex flex-col print-initial overflow-y-auto">
        {children}
      </main>
    </RenderIf>
  );
}
