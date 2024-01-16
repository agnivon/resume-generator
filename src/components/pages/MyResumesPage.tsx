"use client";

import ResumesPageContextProvider, {
  useResumesPageContext,
} from "@/context/page/ResumesPageContextProvider";
import useGetPreviewSettings from "@/hooks/resume/data/useGetPreviewSettings";
import useDeleteResumeV2ById from "@/hooks/resume/data/v2/useDeleteResumeV2ById";
import useGetResumesV2 from "@/hooks/resume/data/v2/useGetResumesV2";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { ResumeV2 } from "@prisma/client";
import { useAlert } from "react-alert";
import ConfirmationModal from "../feature/resume/form/modals/ConfirmationModal";
import ResumeGrid from "../feature/resume/grid/ResumeGrid";
import EditResumeModal from "../feature/resume/grid/modals/EditResumeModal";
import NewResumeModal from "../feature/resume/grid/modals/NewResumeModal";
import ErrorMessage from "../global/ErrorMessage";
import LoadingMessage from "../global/LoadingMessage";
import RenderIf from "../global/RenderIf";

function PageComponent() {
  const { state, dispatch } = useResumesPageContext();

  const { query: resumeQuery, data: resumes } = useGetResumesV2();
  const { query: previewSettingsQuery } = useGetPreviewSettings();
  const deleteResume = useDeleteResumeV2ById();

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
        dispatch(ResumesPageActions.setShowDeleteResumeModal(null));
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
          onClose={() => dispatch(ResumesPageActions.setShowNewResumeModal(false))}
        />
        <EditResumeModal
          show={Boolean(state.showEditResumeModal)}
          resume={state.showEditResumeModal}
          onClose={() => dispatch(ResumesPageActions.setShowEditResumeModal(null))}
        />
        <ConfirmationModal
          show={Boolean(state.showDeleteResumeModal)}
          onClose={() =>
            dispatch(ResumesPageActions.setShowDeleteResumeModal(null))
          }
          message={"All data will be lost permanently. Do you want to proceed?"}
          onConfirm={handleDeleteResume}
        />
        <div className="w-full flex-grow">
          <div className="h-full flex flex-col p-10">
            <ResumeGrid resumes={resumes as ResumeV2[]} />
          </div>
        </div>
      </RenderIf>
    </>
  );
}

export default function MyResumesPage() {
  return (
    <ResumesPageContextProvider>
      <PageComponent />
    </ResumesPageContextProvider>
  );
}
