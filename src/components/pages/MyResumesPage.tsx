"use client";

import ResumesPageContextProvider, {
  useResumesPageContext,
} from "@/context/page/ResumesPageContextProvider";
import useGetMyResumesPageData from "@/hooks/resume/data/page/useGetMyResumesPageData";
import useDeleteResumeV2ById from "@/hooks/resume/data/v2/useDeleteResumeV2ById";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import { ResumeV2 } from "@prisma/client";
import { useAlert } from "react-alert";
import ConfirmationModal from "../feature/resume/form/modals/ConfirmationModal";
import ResumeGrid from "../feature/resume/grid/ResumeGrid";
import EditResumeModal from "../feature/resume/grid/modals/EditResumeModal";
import NewResumeModal from "../feature/resume/grid/modals/NewResumeModal";
import ErrorMessage from "../global/ErrorMessage";
import LoadingMessage from "../global/LoadingMessage";
import RenderIf from "../global/RenderIf";
import ManageTagsDrawer from "../feature/resume/tags/ManageTagsDrawer";
import useDeleteResumeTag from "@/hooks/resume/data/useDeleteResumeTag";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumesPageSlice from "@/redux/slices/page/resumesPageSlice";

function PageComponent() {
  const { state, dispatch } = useResumesPageContext();
  const reduxDispatch = useAppDispatch();

  const { resumeQuery, previewSettingsQuery } = useGetMyResumesPageData();
  const deleteResume = useDeleteResumeV2ById();
  const deleteResumeTag = useDeleteResumeTag();

  const resumes = resumeQuery.data || [];

  const alert = useAlert();

  const isFetching = resumeQuery.isFetching || previewSettingsQuery.isFetching;

  const isError = resumeQuery.isError || previewSettingsQuery.isError;

  const isSuccess =
    !isFetching && resumeQuery.isSuccess && previewSettingsQuery.isSuccess;

  const handleDeleteResume = async () => {
    const resume = state.showDeleteResumeConfirmModal;
    if (resume) {
      try {
        await deleteResume.mutation.mutateAsync(resume.id);
        alert.info(`${resume.name} deleted`);
        dispatch(ResumesPageActions.setShowDeleteResumeModal(null));
      } catch (err) {
        alert.error(getToastErrMessage(err));
      }
    }
  };

  const handleDeleteResumeTag = async () => {
    const id = state.showDeleteResumeTagConfirmModal;
    if (id) {
      try {
        await deleteResumeTag.mutation.mutateAsync(id);
        alert.info(`Tag deleted`);
        reduxDispatch(resumesPageSlice.actions.removeTagFromFilter(id));
        dispatch(ResumesPageActions.setShowDeleteResumeTagConfirmModal(null));
      } catch (err) {
        alert.error(getToastErrMessage(err));
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
          onClose={() =>
            dispatch(ResumesPageActions.setShowNewResumeModal(false))
          }
        />
        <EditResumeModal
          show={Boolean(state.showEditResumeModal)}
          resume={state.showEditResumeModal}
          onClose={() =>
            dispatch(ResumesPageActions.setShowEditResumeModal(null))
          }
        />
        <ConfirmationModal
          show={Boolean(state.showDeleteResumeConfirmModal)}
          onClose={() =>
            dispatch(ResumesPageActions.setShowDeleteResumeModal(null))
          }
          message={"All data will be lost permanently. Do you want to proceed?"}
          onConfirm={handleDeleteResume}
        />
        <ConfirmationModal
          show={Boolean(state.showDeleteResumeTagConfirmModal)}
          onClose={() =>
            dispatch(
              ResumesPageActions.setShowDeleteResumeTagConfirmModal(null)
            )
          }
          message={
            "The tag will be deleted permanently and removed from all resumes. Do you want to proceed?"
          }
          onConfirm={handleDeleteResumeTag}
        />
        <ManageTagsDrawer
          show={state.showManageTagsDrawer}
          onClose={() =>
            dispatch(ResumesPageActions.setShowManageTagsDrawer(false))
          }
        />
        <div className="w-full flex flex-col flex-grow">
          <div className="h-full flex flex-col flex-grow py-10 px-10 relative">
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
