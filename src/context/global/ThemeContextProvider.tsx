"use client";

import { Theme } from "@/types";
import { SetState } from "@/types/utility.types";
import React from "react";
import { useContext } from "react";

type ThemeContextValue = {
  theme: Theme;
  setTheme: SetState<Theme>;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => undefined,
});

const ThemeContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, useThemeContext };
export default ThemeContextProvider;
