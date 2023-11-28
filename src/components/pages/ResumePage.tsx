"use client";

import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import ResumeForm from "../feature/resume/form/ResumeForm";

/* type ResumePageProps = {
  resumeId: string;
}; */

const PageComponent = () => {
  const { value } = useResumePageContext();

  return (
    <>
      <div className="w-full flex-grow">
        <div className="p-10 print:p-0">
          <ResumeForm
            resume={value.resume}
            previewSettings={value.previewSettings}
          />
        </div>
      </div>
    </>
  );
};

export default function ResumePage() {
  return (
    <>
      <PageComponent />
    </>
  );
}
