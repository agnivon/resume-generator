import { ResumesPageState } from "@/types/state.types";
import { ResumeV2 } from "@prisma/client";
import { ImmerReducer, createActionCreators, createReducerFunction } from "immer-reducer";

export const resumesPageInitialState: ResumesPageState = {
  showNewResumeModal: false,
  showEditResumeModal: null,
  showDeleteResumeModal: null,
};

class ResumesPageReducer extends ImmerReducer<ResumesPageState> {
  setShowNewResumeModal(show: boolean) {
    this.draftState.showNewResumeModal = show;
  }
  setShowEditResumeModal(resume: ResumeV2 | null) {
    this.draftState.showEditResumeModal = resume;
  }
  setShowDeleteResumeModal(id: ResumeV2 | null) {
    this.draftState.showDeleteResumeModal = id;
  }
}

export const ResumesPageActions = createActionCreators(ResumesPageReducer);
export const resumesPageReducer = createReducerFunction(
  ResumesPageReducer,
  resumesPageInitialState
);

export default ResumesPageReducer;
