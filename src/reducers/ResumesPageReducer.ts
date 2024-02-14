import { ResumesPageState } from "@/types/state.types";
import { ResumeV2 } from "@prisma/client";
import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from "immer-reducer";

export const resumesPageInitialState: ResumesPageState = {
  filter: { tags: [] },
  showNewResumeModal: false,
  showEditResumeModal: null,
  showDeleteResumeConfirmModal: null,
  showManageTagsDrawer: false,
  showDeleteResumeTagConfirmModal: null,
};

class ResumesPageReducer extends ImmerReducer<ResumesPageState> {
  setShowNewResumeModal(show: boolean) {
    this.draftState.showNewResumeModal = show;
  }

  setShowEditResumeModal(resume: ResumeV2 | null) {
    this.draftState.showEditResumeModal = resume;
  }
  setShowDeleteResumeModal(id: ResumeV2 | null) {
    this.draftState.showDeleteResumeConfirmModal = id;
  }
  setShowManageTagsDrawer(show: boolean) {
    this.draftState.showManageTagsDrawer = show;
  }
  setShowDeleteResumeTagConfirmModal(id: string | null) {
    this.draftState.showDeleteResumeTagConfirmModal = id;
  }
  setTagFilter(tags: string[]) {
    this.draftState.filter.tags = tags;
  }
  addTagToFilter(id: string) {
    this.draftState.filter.tags.unshift(id);
  }
  removeTagFromFilter(id: string) {
    this.draftState.filter.tags = this.draftState.filter.tags.filter(
      (tid) => tid !== id
    );
  }
}

export const ResumesPageActions = createActionCreators(ResumesPageReducer);
export const resumesPageReducer = createReducerFunction(
  ResumesPageReducer,
  resumesPageInitialState
);

export default ResumesPageReducer;
