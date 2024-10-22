import {
  resumePageInitialState,
  resumePageReducer,
} from "@/reducers/ResumePageReducer";
import { ResumePageState } from "@/types/state.types";
import { ResumePreviewSettings } from "@/types/template.types";
import { ResumeV2 } from "@prisma/client";
import React from "react";

type ResumePageContextValue = {
  resume: ResumeV2;
  previewSettings: ResumePreviewSettings | null;
};

type ResumePageContextType = {
  value: ResumePageContextValue;
  state: ResumePageState;
  dispatch: React.Dispatch<any>;
};

const ResumePageContext = React.createContext<ResumePageContextType | null>(
  null
);

const ResumePageContextProvider = ({
  value,
  children,
}: {
  value: ResumePageContextValue;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    resumePageReducer,
    resumePageInitialState
  );

  const contextValue = {
    value,
    state,
    dispatch,
  };

  return (
    <ResumePageContext.Provider value={contextValue}>
      {children}
    </ResumePageContext.Provider>
  );
};

export const useResumePageContext = () =>
  React.useContext(ResumePageContext) as ResumePageContextType;

export default ResumePageContextProvider;
