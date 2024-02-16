import { ResumeFormTab } from "@/constants/state.constants";
import { ResumeV2 } from "@prisma/client";

export type ResumesPageState = {
  filter: ResumesPageFilter;
  showNewResumeModal: boolean;
  showEditResumeModal: ResumeV2 | null;
  showDeleteResumeConfirmModal: ResumeV2 | null;
  showDeleteResumeTagConfirmModal: string | null;
  showManageTagsDrawer: boolean;
};

export type ResumesPageFilter = {
  tags: string[];
};

export type ResumePageState = {
  currentTab: ResumeFormTab;
  showResumeTemplateModal: boolean;
  showResumePreviewDrawer: boolean;
};

export type SidebarState = {
  expand: boolean;
};
