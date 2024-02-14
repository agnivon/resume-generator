import { deleteResumeTag } from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import { getSetQueryDataForDeleteInArray } from "@/utils/query.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/useAppDispatch";
import { produce } from "immer";
import { ResumeV2 } from "@prisma/client";

export default function useDeleteResumeTag() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteResumeTag(id),
    onSuccess: (data, id) => {
      dispatch(resumeSlice.actions.deleteOneResumeTag(data.id));
      queryClient.setQueriesData(
        { queryKey: ["resume-tags"], exact: true },
        getSetQueryDataForDeleteInArray(data.id)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumesV2"], exact: true },
        (data: ResumeV2[] | undefined) => {
          if (data) {
            return produce(data, (draft) => {
              draft.forEach((r) => {
                r.tags = r.tags.filter((t) => t !== id);
              });
            });
          }
          return data;
        }
      );
      queryClient.setQueriesData(
        { queryKey: ["resumeV2"] },
        (data: ResumeV2 | undefined) => {
          if (data) {
            return produce(data, (draft) => {
              draft.tags = draft.tags.filter((t) => t !== id);
            });
          }
          return data;
        }
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
