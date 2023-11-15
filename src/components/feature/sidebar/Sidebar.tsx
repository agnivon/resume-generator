"use client";

import { Routes } from "@/constants/routes.constants";
import { useThemeContext } from "@/context/global/ThemeContextProvider";
import useNextAuthSession from "@/hooks/auth/useNextAuthSession";
import { SVGIconComponentType } from "@/types/utility.types";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import BrandLogo from "../brand/BrandLogo";

type SidebarItemProps = {
  Icon: SVGIconComponentType;
  label: string;
  onClick?: () => void;
  children?: SidebarItemProps[];
};

const SidebarItem = (props: SidebarItemProps) => {
  const { Icon, label, children = [], onClick } = props;
  const isChildrenPresent = children.length > 0;
  const [showChildren, setShowChildren] = React.useState<boolean>(false);
  return (
    <>
      <li>
        <button
          className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          onClick={isChildrenPresent ? () => setShowChildren(true) : onClick}
        >
          <Icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></Icon>
          <span
            className={"ml-3 font-medium flex-1 text-left whitespace-nowrap"}
          >
            {label}
          </span>
          {isChildrenPresent && <ChevronDownIcon className="h-3 w-3" />}
        </button>
      </li>
      {isChildrenPresent && showChildren && (
        <ul className="py-2 space-y-2">
          {children.map((child, idx) => (
            <SidebarItem {...child} key={`${child.label}-${idx}`} />
          ))}
        </ul>
      )}
    </>
  );
};

const DarkModeButton = () => {
  const { theme, setTheme } = useThemeContext();
  const isDarkTheme = theme === "dark";
  return (
    <button
      className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      onClick={() => {
        if (isDarkTheme) setTheme("light");
        else setTheme("dark");
      }}
    >
      <MoonIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></MoonIcon>
      <span className={"ml-3 font-medium flex-1 text-left whitespace-nowrap"}>
        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </span>
    </button>
  );
};

type SidebarProps = {};

export default function Sidebar(_props: SidebarProps) {
  const router = useRouter();

  const { isAuthenticated } = useNextAuthSession();

  const sidebarItems = [
    {
      label: "My Resumes",
      Icon: DocumentTextIcon,
      onClick: () => router.push(Routes.HOME),
    },
  ];

  const signOutItem = {
    label: "Sign Out",
    Icon: ArrowLeftOnRectangleIcon,
    onClick: () => router.push(Routes.SIGNOUT),
  };

  return (
    <aside
      id="sidebar"
      className="min:w-fit w-1/5 min-h-screen transition-transform -translate-x-full sm:translate-x-0 print-hidden"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
        <div>
          <BrandLogo />
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, idx) => (
              <SidebarItem {...item} key={`${item.label}-${idx}`} />
            ))}
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <DarkModeButton />
              {isAuthenticated && <SidebarItem {...signOutItem} />}
            </ul>
          </ul>
        </div>
        <div></div>
      </div>
    </aside>
  );
}
