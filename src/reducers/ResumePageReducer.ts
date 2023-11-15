import { ResumeFormTab } from "@/constants/state.constants";
import { TemplateFont } from "@/constants/template.constants";
import { ResumePageState } from "@/types/state.types";
import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from "immer-reducer";

export const resumePageInitialState: ResumePageState = {
  currentTab: ResumeFormTab.CONTACT,
};

class ResumePageReducer extends ImmerReducer<ResumePageState> {
  setCurrentTab(step: ResumeFormTab) {
    this.draftState.currentTab = step;
  }
}

export const ResumePageActions = createActionCreators(ResumePageReducer);
export const resumePageReducer = createReducerFunction(
  ResumePageReducer,
  resumePageInitialState
);

export default ResumePageReducer;
