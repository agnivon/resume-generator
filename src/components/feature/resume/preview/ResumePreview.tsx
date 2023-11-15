"use client";

import MotionDiv from "@/components/global/motion/MotionDiv";
import { useResumePageContext } from "@/context/ResumePageContextProvider";
import { ResumePreviewSettings } from "@/types/form.types";
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
        <div className="print-hidden">
          <ResumePreviewToolbar />
        </div>
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex gap-x-10">
            <div className="grow">
              <ResumeTemplate
                resume={value.resume}
                template={formik.values.previewSettings.template}
                font={formik.values.previewSettings.font}
                fontSize={formik.values.previewSettings.fontSize}
                lineHeight={formik.values.previewSettings.lineHeight}
                pageSize={formik.values.previewSettings.paperSize}
                ref={resumeTemplateRef}
              />
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}
