"use client";

import { INITIAL_PREVIEW_SETTINGS } from "@/constants/template.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumePreviewSettings } from "@/types/template.types";
import { Formik } from "formik";
import ResumePreviewSidebar from "../feature/resume/preview/ResumePreviewSidebar";
import ResumeTemplate from "../feature/resume/template/ResumeTemplate";
import MotionDiv from "../global/motion/MotionDiv";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { DOMAttributes } from "react";
import { classNames } from "@/utils";

/* type ResumePreviewPageProps = {
  resumeId: string;
}; */

const CloseButton = ({
  onClose,
}: {
  onClose: DOMAttributes<HTMLButtonElement>["onClick"];
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "print:hidden fixed right-4 top-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      )}
      onClick={onClose}
    >
      <XMarkIcon className="w-6 h-6" />
      <span className="sr-only">Close modal</span>
    </button>
  );
};

const PageComponent = () => {
  const router = useRouter();

  const { value } = useResumePageContext();
  const { resume, previewSettings } = value;
  const previewFormValues: { previewSettings: ResumePreviewSettings } = {
    previewSettings: previewSettings || INITIAL_PREVIEW_SETTINGS(),
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Formik
      initialValues={previewFormValues}
      onSubmit={() => undefined}
      enableReinitialize={true}
    >
      {({ values }) => {
        return (
          <>
            <MotionDiv
              className="w-full h-full flex flex-grow print:block"
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-screen xl:w-1/4 print:hidden">
                <ResumePreviewSidebar resume={resume} onBack={handleBack} />
              </div>
              <div className="w-full xl:w-3/4 flex flex-col items-center p-10 print:block print:p-0">
                <CloseButton onClose={handleBack} />
                <ResumeTemplate resume={resume} responsive={true} {...values.previewSettings} />
              </div>
            </MotionDiv>
          </>
        );
      }}
    </Formik>
  );
};

export default function ResumePreviewPage() {
  return (
    <>
      <PageComponent />
    </>
  );
}
