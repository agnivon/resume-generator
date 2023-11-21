"use client";

import { NAVBAR_HIDDEN_ROUTES, Routes } from "@/constants/routes.constants";
import { classNames } from "@/utils";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { usePathname, useRouter } from "next/navigation";
import React, { DOMAttributes } from "react";
import BrandLogo from "../brand/BrandLogo";

const isNavbarVisibleForRoute = (pathname: string): boolean => {
  return !NAVBAR_HIDDEN_ROUTES.some((route) => pathname.match(route));
};

type NavbarItem = {
  label: React.ReactNode;
  active?: boolean;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
};

const NavbarItem = (props: NavbarItem) => {
  const { label, active, onClick } = props;
  return (
    <li>
      <div
        className={classNames(
          "block cursor-pointer py-2 px-3 md:p-0 rounded md:bg-transparent md:border-0 md:dark:bg-transparent md:dark:hover:bg-transparent",
          active
            ? "text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600"
            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white "
        )}
        onClick={onClick}
      >
        {label}
      </div>
    </li>
  );
};

export function MainComponent() {
  const router = useRouter();

  const [subMdClass, setSubMdClass] = React.useState<"hidden" | "block">(
    "hidden"
  );

  const navbarItems = [
    {
      label: "My Resumes",
      onClick: () => router.push(Routes.HOME),
    },
  ];
  return (
    <nav className="block xl:hidden border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 print:hidden">
      <div className="w-full flex flex-wrap items-center justify-between p-2 md:p-4">
        <BrandLogo containerClasses="!mb-0" />
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() =>
            setSubMdClass((c) => (c === "hidden" ? "block" : "hidden"))
          }
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon
            className="w-5 h-5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </button>
        <div className={classNames(subMdClass, "w-full md:block md:w-auto")}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {navbarItems.map((item) => (
              <NavbarItem {...item} key={item.label} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isNavbarVisible = isNavbarVisibleForRoute(pathname);

  return <>{isNavbarVisible && <MainComponent />}</>;
}
