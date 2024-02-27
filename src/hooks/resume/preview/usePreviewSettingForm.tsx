import { useAppSelector } from "@/hooks/redux/useAppSelector";
import resumePreviewPageSlice, {
  previewSettingFormSelector,
} from "@/redux/slices/page/resumePreviewPageSlice";
import { store } from "@/redux/store";
import { ResumePreviewSettings } from "@/types/template.types";
import { shallowEqual } from "react-redux";

export function usePreviewSettingForm(resumeId: string) {
  const previewSettingsForm = useAppSelector(
    (state) => previewSettingFormSelector(state)(resumeId),
    shallowEqual
  );

  const handleValueChanged = (data: Partial<ResumePreviewSettings>) => {
    store.dispatch(
      resumePreviewPageSlice.actions.updatePreviewSettingForm({
        id: resumeId,
        data,
      })
    );
  };

  return { previewSettingsForm, handleValueChanged };
}
