import { ResumeTemplateProps } from "@/components/feature/resume/template/ResumeTemplate";
import React from "react";

type ResumeTemplateContextValue = ResumeTemplateProps;

type ResumeTemplateContextType = ResumeTemplateContextValue;

const ResumeTemplateContext =
  React.createContext<ResumeTemplateContextType | null>(null);

const ResumeTemplateContextProvider = ({
  value,
  children,
}: {
  value: ResumeTemplateContextType;
  children: React.ReactNode;
}) => {
  return (
    <ResumeTemplateContext.Provider value={value}>
      {children}
    </ResumeTemplateContext.Provider>
  );
};

export const useResumeTemplateContext = () =>
  React.useContext(ResumeTemplateContext) as ResumeTemplateContextType;

export default ResumeTemplateContextProvider;
