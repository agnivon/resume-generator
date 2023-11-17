import { ResumeFormTab } from "@/constants/state.constants";
import { Resume } from "./resume.types";

export type HomePageState = {
  showNewResumeModal: boolean;
  showEditResumeModal: Resume | null;
  showDeleteResumeModal: Resume | null;
};

export type ResumePageState = {
  currentTab: ResumeFormTab;
};

export type SidebarState = {
  expand: boolean;
};
