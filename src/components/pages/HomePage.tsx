"use client";

import HomePageContextProvider, {
  useHomePageContext,
} from "@/context/HomePageContextProvider";
import useDeleteCompleteResume from "@/hooks/resume/data/useDeleteCompleteResume";
import useGetCompleteResumes from "@/hooks/resume/data/useGetCompleteResumes";
import useGetPreviewSettings from "@/hooks/resume/data/useGetPreviewSettings";
import { HomePageActions } from "@/reducers/HomePageReducer";
import { CompleteResume, Resume } from "@/types/resume.types";
import { useAlert } from "react-alert";
import ConfirmationModal from "../feature/resume/form/modals/ConfirmationModal";
import ResumeGrid from "../feature/resume/grid/ResumeGrid";
import EditResumeModal from "../feature/resume/grid/modals/EditResumeModal";
import NewResumeModal from "../feature/resume/grid/modals/NewResumeModal";
import ErrorMessage from "../global/ErrorMessage";
import LoadingMessage from "../global/LoadingMessage";
import RenderIf from "../global/RenderIf";

function PageComponent() {
  const { state, dispatch } = useHomePageContext();

  const { query: resumeQuery, data: resumes } = useGetCompleteResumes();
  const { query: previewSettingsQuery } = useGetPreviewSettings();
  const deleteResume = useDeleteCompleteResume();

  const alert = useAlert();

  const isFetching = resumeQuery.isFetching || previewSettingsQuery.isFetching;

  const isError = resumeQuery.isError || previewSettingsQuery.isError;

  const isSuccess =
    !isFetching && resumeQuery.isSuccess && previewSettingsQuery.isSuccess;

  const handleDeleteResume = async () => {
    const resume = state.showDeleteResumeModal;
    if (resume) {
      try {
        await deleteResume.mutation.mutateAsync(resume.id);
        alert.info(`${resume.name} deleted`);
        dispatch(HomePageActions.setShowDeleteResumeModal(null));
      } catch {
        alert.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <RenderIf isTrue={isFetching}>
        <LoadingMessage />
      </RenderIf>
      <RenderIf isTrue={isError}>
        <ErrorMessage message="Something went wrong" />
      </RenderIf>
      <RenderIf isTrue={isSuccess}>
        <NewResumeModal
          show={state.showNewResumeModal}
          onClose={() => dispatch(HomePageActions.setShowNewResumeModal(false))}
        />
        <EditResumeModal
          show={Boolean(state.showEditResumeModal)}
          resume={state.showEditResumeModal}
          onClose={() => dispatch(HomePageActions.setShowEditResumeModal(null))}
        />
        <ConfirmationModal
          show={Boolean(state.showDeleteResumeModal)}
          onClose={() =>
            dispatch(HomePageActions.setShowDeleteResumeModal(null))
          }
          message={"All data will be lost permanently. Do you want to proceed?"}
          onConfirm={handleDeleteResume}
        />
        <div className="w-full flex-grow">
          <div className="h-full flex flex-col p-10">
            <ResumeGrid resumes={resumes as CompleteResume[]} />
          </div>
        </div>
      </RenderIf>
    </>
  );
}

export default function HomePage() {
  return (
    <HomePageContextProvider>
      <PageComponent />
    </HomePageContextProvider>
  );
}
