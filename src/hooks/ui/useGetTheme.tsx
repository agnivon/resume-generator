import { Theme } from "@/types";
import { SetState } from "@/types/utility.types";
import React from "react";

export default function useGetTheme(): [Theme, SetState<Theme>] {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  return [theme, setTheme];
}
