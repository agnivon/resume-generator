"use client";

import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import ResumeForm from "../feature/resume/form/ResumeForm";
import { useSearchParams } from "next/navigation";
import { ResumeFormTab } from "@/constants/state.constants";

/* type ResumePageProps = {
  resumeId: string;
}; */

const PageComponent = () => {
  const { value } = useResumePageContext();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") ||
    ResumeFormTab.CONTACT) as ResumeFormTab;

  return (
    <>
      <div className="w-full flex-grow">
        <div className="p-10 print:p-0">
          <ResumeForm
            resume={value.resume}
            currentTab={tab}
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
