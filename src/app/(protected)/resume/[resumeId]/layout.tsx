"use client";

import ErrorMessage from "@/components/global/ErrorMessage";
import LoadingMessage from "@/components/global/LoadingMessage";
import RenderIf from "@/components/global/RenderIf";
import ResumePageContextProvider from "@/context/page/ResumePageContextProvider";
import useGetResumePageData from "@/hooks/resume/data/page/useGetResumePageData";
import { ResumePreviewSettings } from "@/types/template.types";
import { ResumeV2 } from "@prisma/client";

export default function ResumePageWrapper({
  params,
  children,
}: {
  params: { resumeId: string };
  children: React.ReactNode;
}) {
  const { resumeQuery, previewSettingsQuery, resume, previewSettings } =
    useGetResumePageData(params.resumeId);
  return (
    <>
      <ResumePageContextProvider
        value={{
          resume: resume as ResumeV2,
          previewSettings: previewSettings as ResumePreviewSettings,
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
          {children}
        </RenderIf>
      </ResumePageContextProvider>
    </>
  );
}
