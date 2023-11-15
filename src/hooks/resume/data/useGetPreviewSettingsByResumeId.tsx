import { getPreviewSettingsByResumeId } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { exclude } from "@/utils/object.utils";
import { useQuery } from "@tanstack/react-query";

export default function useGetPreviewSettingsByResumeId(id: string) {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ["previewSettings", id],
    queryFn: () =>
      getPreviewSettingsByResumeId(id).then((data) => {
        if (data) {
          dispatch(resumeSlice.actions.upsertOnePreviewSetting(data));
          return data;
        }
        return null;
      }),
    staleTime: Infinity,
  });

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
  } = query;

  return {
    query,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
  };
}
