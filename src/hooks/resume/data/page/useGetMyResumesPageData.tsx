import useGetPreviewSettings from "../useGetPreviewSettings";
import useGetResumeTags from "../useGetResumeTags";
import useGetResumesV2 from "../v2/useGetResumesV2";

export default function useGetMyResumesPageData() {
  const resumeQuery = useGetResumesV2();
  const resumeTagsQuery = useGetResumeTags();
  const previewSettingsQuery = useGetPreviewSettings();

  return {
    resume: resumeQuery.data,
    tags: resumeTagsQuery.data,
    resumeQuery,
    resumeTagsQuery,
    previewSettingsQuery,
  };
}
