"use client";

import { ButtonProps } from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import { NAVBAR_HIDDEN_ROUTES, Routes } from "@/constants/routes.constants";
import { useThemeContext } from "@/context/global/ThemeContextProvider";
import useNextAuthSession from "@/hooks/auth/useNextAuthSession";
import { classNames } from "@/utils";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { usePathname, useRouter } from "next/navigation";
import React, { DOMAttributes } from "react";
import BrandLogo from "../brand/BrandLogo";
import Avatar from "../user/Avatar";

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
            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white group"
        )}
        onClick={onClick}
      >
        {label}
      </div>
    </li>
  );
};

/* const DarkModeButton = () => {
  const { theme, setTheme } = useThemeContext();
  const isDarkTheme = theme === "dark";

  return (
    <NavbarItem
      onClick={() => {
        if (isDarkTheme) setTheme("light");
        else setTheme("dark");
      }}
      label={
        <>
          <MoonIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></MoonIcon>
          <span className="md:hidden">
            {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </span>
        </>
      }
    />
  );
}; */

/* const SignOutButton = () => {
  const router = useRouter();

  return (
    <NavbarItem
      onClick={() => router.push(Routes.SIGNOUT)}
      label={
        <>
          <ArrowLeftOnRectangleIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></ArrowLeftOnRectangleIcon>
          <span className="md:hidden">Sign Out</span>
        </>
      }
    />
  );
}; */

const UserDropdown = () => {
  const { session } = useNextAuthSession();
  const { theme, setTheme } = useThemeContext();
  const isDarkTheme = theme === "dark";
  const router = useRouter();

  const items = [
    { key: "Switch Theme", value: "Switch Theme" },
    { key: "Sign Out", value: "Sign Out" },
  ];

  return (
    <div className="mt-1">
      <Dropdown
        value={null}
        ButtonComponent={({ onClick }: ButtonProps) => (
          <button onClick={onClick}>
            <Avatar
              imageUrl={session?.user?.image}
              showName={false}
              height={30}
              width={30}
            />
          </button>
        )}
        items={items}
        customMenuClassNames="-left-36 md:-left-40 !w-48"
        dropdownHeader={
          <>
            <span className="block text-sm text-gray-900 dark:text-white">
              {session?.user?.name}
            </span>
            <span className="block text-xs  text-gray-500 truncate dark:text-gray-400">
              {session?.user?.email}
            </span>
          </>
        }
        onChange={(value) => {
          if (value === "Switch Theme") {
            if (isDarkTheme) setTheme("light");
            else setTheme("dark");
          } else if (value === "Sign Out") {
            router.push(Routes.SIGNOUT);
          }
        }}
      />
    </div>
  );
};

export function MainComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const [subMdClass, setSubMdClass] = React.useState<"hidden" | "block">(
    "hidden"
  );

  const navbarItems = [
    {
      label: "My Resumes",
      onClick: () => router.push(Routes.RESUMES),
      active: new RegExp(`${Routes.RESUMES}$`).test(pathname),
    },
  ];
  return (
    <nav className="block xl:hidden border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 print:hidden">
      <div className="w-full flex flex-wrap items-center justify-between px-2 py-3 md:p-3">
        <BrandLogo containerClasses="!mb-0" />
        <div className="flex gap-3 md:gap-6 items-center flex-wrap md:flex-row-reverse">
          <div className="md:hidden">
            <UserDropdown />
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() =>
              setSubMdClass((c) => (c === "hidden" ? "block" : "hidden"))
            }
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="w-6 h-6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </button>
        </div>
        <div
          className={classNames(
            subMdClass,
            "w-full md:block md:w-auto md:order-1"
          )}
        >
          <ul className="flex flex-col font-medium p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700 md:items-center">
            {navbarItems.map((item) => (
              <NavbarItem {...item} key={item.label} />
            ))}
            <li className="hidden md:block">
              <UserDropdown />
            </li>
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
