import {
    insertResumeV2
} from "@/endpoints/resume.endpoints";
import {
    getSetQueryDataForInsertOrUpdateById,
    getSetQueryDataForInsertOrUpdateInArray,
} from "@/utils/query.utils";
import { ResumeV2 } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export default function useInsertResumeV2() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (resume: ResumeV2) => insertResumeV2(resume),
    onSuccess: (data) => {
      //dispatch(resumeSlice.actions.upsertOneCompleteResume(data));
      queryClient.setQueriesData(
        { queryKey: ["resumesV2"], exact: true },
        getSetQueryDataForInsertOrUpdateInArray(data)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumeV2", data.id], exact: true },
        getSetQueryDataForInsertOrUpdateById(data)
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
