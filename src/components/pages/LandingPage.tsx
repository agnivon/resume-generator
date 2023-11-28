"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button, { ButtonSize } from "../global/Button";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes.constants";
import BrandLogo from "../feature/brand/BrandLogo";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative">
      <div className="absolute left-3 top-4">
        <BrandLogo />
      </div>
      <div className="text-8xl text-center mb-8">
        Generate a resume in <span className="text-blue-500">minutes</span>
      </div>
      <Button
        label="Get Started"
        Icon={ArrowRightIcon}
        customIconClassNames="h-6 w-6"
        onClick={() => router.push(Routes.HOME)}
        size={ButtonSize.EXTRA_LARGE}
      />
    </div>
  );
}
