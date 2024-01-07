import { exclude } from "@/utils/object.utils";
import useGetCompleteResumeById from "../useGetCompleteResumeById";
import useGetPreviewSettingsByResumeId from "../useGetPreviewSettingsByResumeId";
import useGetResumeV2ById from "../v2/useGetResumeV2ById";

export default function useGetResumePageData(resumeId: string) {
  const resumeQuery = useGetResumeV2ById(resumeId);
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
