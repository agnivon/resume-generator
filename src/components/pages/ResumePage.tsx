"use client";

import ResumePageContextProvider, {
  useResumePageContext,
} from "@/context/ResumePageContextProvider";
import useGetCompleteResumeById from "@/hooks/resume/data/useGetCompleteResumeById";
import { CompleteResume } from "@/types/resume.types";
import ResumeForm from "../feature/resume/form/ResumeForm";
import ErrorMessage from "../global/ErrorMessage";
import LoadingMessage from "../global/LoadingMessage";
import RenderIf from "../global/RenderIf";
import useGetPreviewSettingsByResumeId from "@/hooks/resume/data/useGetPreviewSettingsByResumeId";
import { ResumePreviewSettings } from "@/types/template.types";
import { exclude } from "@/utils/object.utils";
type ResumePageProps = {
  resumeId: string;
};

const PageComponent = (_props: ResumePageProps) => {
  const { value } = useResumePageContext();

  return (
    <>
      <div className="w-full flex-grow">
        <div className="p-10 print-padding-none">
          <ResumeForm
            resume={value.resume}
            previewSettings={value.previewSettings}
          />
        </div>
      </div>
    </>
  );
};

export default function ResumePage(props: ResumePageProps) {
  const resumeQuery = useGetCompleteResumeById(props.resumeId);
  const previewSettingsQuery = useGetPreviewSettingsByResumeId(props.resumeId);
  const previewSettings = previewSettingsQuery.data
    ? (exclude(previewSettingsQuery.data, [
        "id",
        "resumeId",
      ]) as ResumePreviewSettings)
    : null;
  return (
    <>
      <ResumePageContextProvider
        value={{
          resume: resumeQuery.data as CompleteResume,
          previewSettings,
        }}
      >
        <RenderIf
          isTrue={resumeQuery.isLoading || previewSettingsQuery.isLoading}
        >
          <LoadingMessage />
        </RenderIf>
        <RenderIf isTrue={resumeQuery.isError || previewSettingsQuery.isError}>
          <ErrorMessage message="Resume not found" />
        </RenderIf>
        <RenderIf
          isTrue={resumeQuery.isSuccess && previewSettingsQuery.isSuccess}
        >
          <PageComponent {...props} />
        </RenderIf>
      </ResumePageContextProvider>
    </>
  );
}
