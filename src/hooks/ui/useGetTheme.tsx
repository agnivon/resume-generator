import { Theme } from "@/types";
import { SetState } from "@/types/utility.types";
import React from "react";

export default function useGetTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      actualSetTheme("dark");
    }
  }, []);

  const actualSetTheme = (theme: Theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(theme);
  };

  return [theme, actualSetTheme];
}
