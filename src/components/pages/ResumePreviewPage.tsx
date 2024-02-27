"use client";

import { INITIAL_PREVIEW_SETTINGS } from "@/constants/template.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumePageActions } from "@/reducers/ResumePageReducer";
import { ResumePreviewSettings } from "@/types/template.types";
import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { DOMAttributes } from "react";
import ResumePreviewDrawer from "../feature/resume/preview/ResumePreviewDrawer";
import ResumePreviewSidebar from "../feature/resume/preview/ResumePreviewSidebar";
import ResumeTemplateModal from "../feature/resume/preview/ResumeTemplateModal";
import ResumeTemplate from "../feature/resume/template/ResumeTemplate";
import MotionDiv from "../global/motion/MotionDiv";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { previewSettingFormSelector } from "@/redux/slices/page/resumePreviewPageSlice";
import { shallowEqual } from "react-redux";
import { usePreviewSettingForm } from "@/hooks/resume/preview/usePreviewSettingForm";

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
  const { resume } = value;

  const { previewSettingsForm } = usePreviewSettingForm(resume.id);

  const handleBack = () => {
    router.back();
  };

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
        <div className="w-full xl:w-3/4 flex flex-col items-center p-10 pt-5 max-xl:pb-20 print:block print:p-0">
          <CloseButton onClose={handleBack} />
          {!state.showResumePreviewDrawer && (
            <ResumePreviewDrawerButton
              onClick={() => {
                dispatch(ResumePageActions.setShowResumePreviewDrawer(true));
              }}
            />
          )}
          <div className="text-2xl mb-5 text-center print:hidden font-semibold text-gray-500 dark:text-gray-400">
            {resume.name}
          </div>
          <ResumeTemplate
            resume={resume}
            responsive={true}
            {...(previewSettingsForm as ResumePreviewSettings)}
          />
        </div>
      </MotionDiv>
    </>
  );
};

export default function ResumePreviewPage() {
  return (
    <>
      <PageComponent />
    </>
  );
}
