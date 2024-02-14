import { cloneResumeV2 } from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import { getSetQueryDataForInsertOrUpdateInArray } from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export default function useCloneResumeV2() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => cloneResumeV2(id),
    onSuccess: (data) => {
      const { previewSettings, ...resume } = data;
      dispatch(resumeSlice.actions.upsertOneResumeV2(resume));
      if (previewSettings)
        dispatch(resumeSlice.actions.upsertOnePreviewSetting(previewSettings));
      queryClient.setQueriesData(
        { queryKey: ["resumesV2"], exact: true },
        getSetQueryDataForInsertOrUpdateInArray(resume)
      );
      queryClient.setQueryData(["resumeV2", data.id], resume);
      //queryClient.invalidateQueries({ queryKey: ["resumes"], exact: true });
      queryClient.setQueriesData(
        { queryKey: ["previewSettings"], exact: true },
        getSetQueryDataForInsertOrUpdateInArray(data)
      );
      if (previewSettings)
        queryClient.setQueryData(["previewSetting", data.id], previewSettings);
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
