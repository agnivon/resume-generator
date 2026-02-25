import { Theme } from "@/types";
import React from "react";

export default function useGetTheme(): [Theme, (theme: Theme) => void] {
  const theme: Theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  React.useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  const setTheme = (theme: Theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return [theme, setTheme];
}
