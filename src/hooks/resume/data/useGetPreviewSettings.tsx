import { getPreviewSettings } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useGetPreviewSettings() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["previewSettings"],
    queryFn: () =>
      getPreviewSettings().then((data) => {
        dispatch(resumeSlice.actions.upsertManyPreviewSettings(data));
        data.forEach((setting) => {
          queryClient.setQueryData(
            ["previewSetting", setting.resumeId],
            setting
          );
        });
        return data;
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
