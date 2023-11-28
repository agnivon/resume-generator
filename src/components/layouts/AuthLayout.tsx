import { Routes } from "@/constants/routes.constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { cache } from "react";
import RenderIf from "../global/RenderIf";
import Sidebar from "../feature/sidebar/Sidebar";
import { isAuthenticated } from "@/utils/session.utils";
import Navbar from "../feature/navbar/Navbar";
import prisma from "@/clients/prismaClient";
import AuthLayoutContextProvider from "@/context/layout/AuthLayoutContextProvider";

const getUserDetails = cache(async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { email: id } });
  const userMembership = await prisma.userMembership.findUnique({
    where: { userId: user.id },
  });

  return { user, membership: userMembership };
});

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

  const userId = session.user?.email;

  if (!userId) {
    redirect(Routes.SIGNIN);
  }

  const userDetails = await getUserDetails(userId);

  return (
    <RenderIf isTrue={authenticated}>
      <AuthLayoutContextProvider value={{ userDetails }}>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="min-h-screen w-full flex flex-col print-initial overflow-y-auto">
            {children}
          </main>
        </div>
      </AuthLayoutContextProvider>
    </RenderIf>
  );
}
