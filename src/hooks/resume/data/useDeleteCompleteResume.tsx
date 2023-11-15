import {
  deleteCompleteResume
} from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import {
  getSetQueryDataForDeleteCompleteResumes
} from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/useAppDispatch";

export default function useDeleteCompleteResume() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCompleteResume(id),
    onSuccess: (data) => {
      dispatch(resumeSlice.actions.deleteOneCompleteResume(data.id));
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForDeleteCompleteResumes(data.id)
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
