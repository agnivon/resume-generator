"use client";

import Card from "@/components/global/Card";
import BrandLogo from "../brand/BrandLogo";
import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes.constants";

export default function SignOutCard() {
  const router = useRouter();
  return (
    <div>
      <Card>
        <div>
          <BrandLogo iconDimensions={40} textClasses="text-2xl" />
        </div>
        <div className="mb-4 text-xl">Do you really want to sign out?</div>
        <div className="flex gap-x-6">
          <Button
            label={`Sign out`}
            onClick={() => signOut({ callbackUrl: Routes.ROOT })}
            color={ButtonColor.LIGHT}
            size={ButtonSize.BASE}
            customClassNames="w-full"
          />
          <Button
            label={`Go Back`}
            onClick={() => router.back()}
            color={ButtonColor.LIGHT}
            size={ButtonSize.BASE}
            customClassNames="w-full"
          />
        </div>
      </Card>
    </div>
  );
}
