import {
  resumesPageInitialState,
  resumesPageReducer,
} from "@/reducers/ResumesPageReducer";
import { ResumesPageState } from "@/types/state.types";
import React, { useContext } from "react";

type ResumesPageContextValue = {};

const defaultValue: ResumesPageContextValue = {};

type ResumesPageContextType = {
  value: ResumesPageContextValue;
  state: ResumesPageState;
  dispatch: React.Dispatch<any>;
};

const ResumesPageContext = React.createContext<ResumesPageContextType | null>(
  null
);

const ResumesPageContextProvider = ({
  value = defaultValue,
  children,
}: {
  value?: ResumesPageContextValue;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    resumesPageReducer,
    resumesPageInitialState
  );
  const contextValue = {
    value,
    state,
    dispatch,
  };
  return (
    <ResumesPageContext.Provider value={contextValue}>
      {children}
    </ResumesPageContext.Provider>
  );
};

export const useResumesPageContext = () =>
  useContext(ResumesPageContext) as ResumesPageContextType;

export default ResumesPageContextProvider;
