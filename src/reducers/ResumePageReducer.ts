import { ResumeFormTab } from "@/constants/state.constants";
import { ResumePageState } from "@/types/state.types";
import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from "immer-reducer";

export const resumePageInitialState: ResumePageState = {
  currentTab: ResumeFormTab.CONTACT,
  showResumeTemplateModal: false,
  showResumePreviewDrawer: false,
};

class ResumePageReducer extends ImmerReducer<ResumePageState> {
  setCurrentTab(step: ResumeFormTab) {
    this.draftState.currentTab = step;
  }
  setShowResumeTemplateModal(show: boolean) {
    this.draftState.showResumeTemplateModal = show;
  }
  setShowResumePreviewDrawer(show: boolean) {
    this.draftState.showResumePreviewDrawer = show;
  }
}

export const ResumePageActions = createActionCreators(ResumePageReducer);
export const resumePageReducer = createReducerFunction(
  ResumePageReducer,
  resumePageInitialState
);

export default ResumePageReducer;
