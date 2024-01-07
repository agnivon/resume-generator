import {
    deleteResumeV2
} from "@/endpoints/resume.endpoints";
import { getSetQueryDataForDeleteInArray } from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export default function useDeleteResumeV2ById() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteResumeV2(id),
    onSuccess: (data) => {
      //dispatch(resumeSlice.actions.deleteOneCompleteResume(data.id));
      queryClient.setQueriesData(
        { queryKey: ["resumesV2"], exact: true },
        getSetQueryDataForDeleteInArray(data.id)
      );
      //queryClient.invalidateQueries({ queryKey: ["resumes"], exact: true });
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
