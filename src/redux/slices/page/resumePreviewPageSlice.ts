import { INITIAL_PREVIEW_SETTINGS } from "@/constants/template.constants";
import { RootState } from "@/redux/store";
import { exclude } from "@/utils/object.utils";
import { ResumePreviewSettings } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ResumePreviewPageSlice = {
  previewSettingsForm: Record<
    string,
    Omit<ResumePreviewSettings, "id" | "resumeId">
  >;
};

const initialState: ResumePreviewPageSlice = {
  previewSettingsForm: {},
};

export const resumePreviewPageSlice = createSlice({
  name: "resumePreviewPage",
  initialState,
  reducers: {
    updatePreviewSettingForm(
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<Omit<ResumePreviewSettings, "id" | "resumeId">>;
      }>
    ) {
      const { id, data } = action.payload;
      state.previewSettingsForm[id] = {
        ...state.previewSettingsForm[id],
        ...data,
      };
    },
  },
});

export const previewSettingFormSelector = (state: RootState) => {
  return (resumeId: string) => {
    return exclude(
      {
        ...INITIAL_PREVIEW_SETTINGS(),
        ...state.resume.previewSettings.entities[resumeId],
        ...state.page.resumePreviewPage.previewSettingsForm[resumeId],
      },
      ["id", "resumeId"]
    );
  };
};

export default resumePreviewPageSlice;
