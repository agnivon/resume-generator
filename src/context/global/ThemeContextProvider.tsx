"use client";

import useGetTheme from "@/hooks/ui/useGetTheme";
import { Theme } from "@/types";
import { SetState } from "@/types/utility.types";
import { classNames } from "@/utils";
import React, { useContext } from "react";

type ThemeContextValue = {
  theme: Theme;
  setTheme: SetState<Theme>;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => undefined,
});

const ThemeContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useGetTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="themeContext" className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, useThemeContext };
export default ThemeContextProvider;
