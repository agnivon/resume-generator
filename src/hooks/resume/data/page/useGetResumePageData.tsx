import { exclude } from "@/utils/object.utils";
import useGetCompleteResumeById from "../useGetCompleteResumeById";
import useGetPreviewSettingsByResumeId from "../useGetPreviewSettingsByResumeId";

export default function useGetResumePageData(resumeId: string) {
  const resumeQuery = useGetCompleteResumeById(resumeId);
  const previewSettingsQuery = useGetPreviewSettingsByResumeId(resumeId);

  return {
    resume: resumeQuery.data,
    previewSettings: previewSettingsQuery.data
      ? exclude(previewSettingsQuery.data, ["id", "resumeId"])
      : previewSettingsQuery.data,
    resumeQuery,
    previewSettingsQuery,
  };
}
