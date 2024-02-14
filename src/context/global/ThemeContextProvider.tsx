"use client";

import useGetTheme from "@/hooks/ui/useGetTheme";
import { Theme } from "@/types";
import React, { useContext } from "react";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => undefined,
});

const ThemeContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useGetTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, useThemeContext };
export default ThemeContextProvider;
