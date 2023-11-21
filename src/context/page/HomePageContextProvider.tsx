import {
  homePageInitialState,
  homePageReducer,
} from "@/reducers/HomePageReducer";
import { HomePageState } from "@/types/state.types";
import React, { useContext } from "react";

type HomePageContextValue = {};

const defaultValue: HomePageContextValue = {};

type HomePageContextType = {
  value: HomePageContextValue;
  state: HomePageState;
  dispatch: React.Dispatch<any>;
};

const HomePageContext = React.createContext<HomePageContextType | null>(null);

const HomePageContextProvider = ({
  value = defaultValue,
  children,
}: {
  value?: HomePageContextValue;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    homePageReducer,
    homePageInitialState
  );
  const contextValue = {
    value,
    state,
    dispatch,
  };
  return (
    <HomePageContext.Provider value={contextValue}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePageContext = () =>
  useContext(HomePageContext) as HomePageContextType;

export default HomePageContextProvider;
