import { updateResume } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { Resume } from "@/types/resume.types";
import {
  getSetQueryDataForResumeById,
  getSetQueryDataForResumes,
} from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateResume() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (resume: Resume) => updateResume(resume.id, resume),
    onSuccess: (data) => {
      dispatch(
        resumeSlice.actions.updateOneResume({ id: data.id, changes: data })
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForResumes(data)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes", data.id], exact: true },
        getSetQueryDataForResumeById(data)
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
