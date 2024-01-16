import { ResumeFormTab } from "@/constants/state.constants";
import { ResumeV2 } from "@prisma/client";

export type ResumesPageState = {
  showNewResumeModal: boolean;
  showEditResumeModal: ResumeV2 | null;
  showDeleteResumeModal: ResumeV2 | null;
};

export type ResumePageState = {
  currentTab: ResumeFormTab;
};

export type SidebarState = {
  expand: boolean;
};
