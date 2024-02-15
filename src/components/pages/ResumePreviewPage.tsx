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
import ResumeTemplateModal from "../feature/resume/preview/ResumeTemplateModal";
import { ResumePageActions } from "@/reducers/ResumePageReducer";
import ResumeTemplateDrawer from "../feature/resume/preview/ResumeTemplateDrawer";
import ResumePreviewDrawer from "../feature/resume/preview/ResumePreviewDrawer";

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
        "print:hidden fixed right-4 top-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white z-20"
      )}
      onClick={onClose}
    >
      <XMarkIcon className="w-6 h-6" />
      <span className="sr-only">Close modal</span>
    </button>
  );
};

const ResumePreviewDrawerButton = (props: DOMAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="print:hidden xl:hidden fixed bg-gray-100 dark:bg-gray-800 bottom-0 z-20 p-2 rounded-t-lg border border-b-0 border-gray-200 dark:border-gray-500 w-fit shadow dark:shadow-sm-light"
      {...props}
    >
      Actions
    </button>
  );
};

const PageComponent = () => {
  const router = useRouter();

  const { value, state, dispatch } = useResumePageContext();
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
            <ResumeTemplateModal
              show={state.showResumeTemplateModal}
              onClose={() =>
                dispatch(ResumePageActions.setShowResumeTemplateModal(false))
              }
            />
            <ResumePreviewDrawer
              resume={resume}
              show={state.showResumePreviewDrawer}
              onClose={() =>
                dispatch(ResumePageActions.setShowResumePreviewDrawer(false))
              }
            />
            <MotionDiv
              className="w-full h-full flex flex-grow print:block"
              transition={{ duration: 0.2 }}
            >
              <ResumePreviewSidebar resume={resume} />
              <div className="w-full xl:w-4/5 flex flex-col items-center p-10 pt-5 max-xl:pb-20 print:block print:p-0">
                <CloseButton onClose={handleBack} />
                {!state.showResumePreviewDrawer && (
                  <ResumePreviewDrawerButton
                    onClick={() => {
                      dispatch(
                        ResumePageActions.setShowResumePreviewDrawer(true)
                      );
                    }}
                  />
                )}
                <div className="text-2xl mb-5 text-center print:hidden font-semibold text-gray-500 dark:text-gray-400">
                  {resume.name}
                </div>
                <ResumeTemplate
                  resume={resume}
                  responsive={true}
                  {...values.previewSettings}
                />
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
