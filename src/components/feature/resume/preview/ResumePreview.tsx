"use client";

import MotionDiv from "@/components/global/motion/MotionDiv";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumePreviewSettings } from "@/types/template.types";
import { useFormikContext } from "formik";
import { useRef } from "react";
import ResumeTemplate from "../template/ResumeTemplate";
import ResumePreviewToolbar from "./ResumePreviewToolbar";

export default function ResumePreview() {
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();

  const { value } = useResumePageContext();

  const resumeTemplateRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <MotionDiv className="flex flex-col gap-y-8">
        <div className="print:hidden">
          <ResumePreviewToolbar />
        </div>
        <div className="flex flex-col items-center gap-y-6">
          <ResumeTemplate
            resume={value.resume}
            {...formik.values.previewSettings}
            ref={resumeTemplateRef}
          />
        </div>
      </MotionDiv>
    </>
  );
}
