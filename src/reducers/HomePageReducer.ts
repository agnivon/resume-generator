import { Resume } from "@/types/resume.types";
import { HomePageState } from "@/types/state.types";
import { createReducerFunction } from "immer-reducer";
import { ImmerReducer, createActionCreators } from "immer-reducer";

export const homePageInitialState: HomePageState = {
  showNewResumeModal: false,
  showEditResumeModal: null,
  showDeleteResumeModal: null,
};

class HomePageReducer extends ImmerReducer<HomePageState> {
  setShowNewResumeModal(show: boolean) {
    this.draftState.showNewResumeModal = show;
  }
  setShowEditResumeModal(resume: Resume | null) {
    this.draftState.showEditResumeModal = resume;
  }
  setShowDeleteResumeModal(id: Resume | null) {
    this.draftState.showDeleteResumeModal = id;
  }
}

export const HomePageActions = createActionCreators(HomePageReducer);
export const homePageReducer = createReducerFunction(
  HomePageReducer,
  homePageInitialState
);

export default HomePageReducer;
