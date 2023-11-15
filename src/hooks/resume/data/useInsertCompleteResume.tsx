import { insertCompleteResume } from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import { CompleteResume } from "@/types/resume.types";
import {
    getSetQueryDataForCompleteResumeById,
    getSetQueryDataForCompleteResumes,
} from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/useAppDispatch";

export default function useInsertCompleteResume() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (resume: CompleteResume) => insertCompleteResume(resume),
    onSuccess: (data) => {
      dispatch(resumeSlice.actions.upsertOneCompleteResume(data));
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForCompleteResumes(data)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes", data.id], exact: true },
        getSetQueryDataForCompleteResumeById(data)
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
