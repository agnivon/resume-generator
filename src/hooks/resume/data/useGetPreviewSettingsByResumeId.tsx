import { getPreviewSettingsByResumeId } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { useQuery } from "@tanstack/react-query";

export default function useGetPreviewSettingsByResumeId(id: string) {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ["previewSetting", id],
    queryFn: () =>
      getPreviewSettingsByResumeId(id).then((data) => {
        if (data) {
          dispatch(resumeSlice.actions.upsertOnePreviewSetting(data));
          return data;
        }
        return null;
      }),
    staleTime: Infinity,
    //gcTime: Infinity,
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
