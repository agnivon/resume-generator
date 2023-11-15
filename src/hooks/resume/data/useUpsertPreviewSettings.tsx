import { upsertPreviewSettings } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { getSetQueryDataForPreviewSettings } from "@/utils/query.utils";
import { ResumePreviewSettings } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpsertPreviewSettings() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      resumeId,
      previewSettings,
    }: {
      resumeId: string;
      previewSettings: Omit<ResumePreviewSettings, "id" | "resumeId">;
    }) => upsertPreviewSettings(resumeId, previewSettings),
    onSuccess: (data, variables) => {
      dispatch(resumeSlice.actions.upsertOnePreviewSetting(data));
      queryClient.setQueriesData(
        { queryKey: ["previewSettings"], exact: true },
        getSetQueryDataForPreviewSettings(data)
      );
      queryClient.setQueriesData(
        { queryKey: ["previewSettings", variables.resumeId], exact: true },
        () => {
          return data;
        }
      );
    },
  });

  const { data, isPending, isError, isSuccess, status } = mutation;

  return {
    mutation,
    data,
    isPending,
    isError,
    isSuccess,
    status,
  };
}
