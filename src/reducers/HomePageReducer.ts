import { HomePageState } from "@/types/state.types";
import { ResumeV2 } from "@prisma/client";
import { ImmerReducer, createActionCreators, createReducerFunction } from "immer-reducer";

export const homePageInitialState: HomePageState = {
  showNewResumeModal: false,
  showEditResumeModal: null,
  showDeleteResumeModal: null,
};

class HomePageReducer extends ImmerReducer<HomePageState> {
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

export const HomePageActions = createActionCreators(HomePageReducer);
export const homePageReducer = createReducerFunction(
  HomePageReducer,
  homePageInitialState
);

export default HomePageReducer;
