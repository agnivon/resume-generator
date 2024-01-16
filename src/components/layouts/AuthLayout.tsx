import prisma from "@/clients/prismaClient";
import { Routes } from "@/constants/routes.constants";
import AuthLayoutContextProvider from "@/context/layout/AuthLayoutContextProvider";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { redirect } from "next/navigation";
import React, { cache } from "react";
import Navbar from "../feature/navbar/Navbar";
import Sidebar from "../feature/sidebar/Sidebar";
import RenderIf from "../global/RenderIf";

export const revalidate = 3600; // revalidate the data at most every hour

const getUserDetails = cache(async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: id } });
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
  const session = await getNextAuthServerSession();

  const authenticated = isAuthenticated(session);

  if (!authenticated) {
    redirect(Routes.SIGNIN);
  }

  if (!session?.user) return <></>;

  const userId = session.user?.id;

  if (!userId) {
    redirect(Routes.SIGNIN);
  }

  //console.log(session);

  const userDetails = await getUserDetails(userId);

  //console.log(userDetails);

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
