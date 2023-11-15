import { deleteResumeEntityById } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { ResumeEntity, ResumeEntityArrayKeys } from "@/types/resume.types";
import {
  getSetQueryDataForDeleteEntities,
  getSetQueryDataForDeleteEntityByResumeId,
} from "@/utils/query.utils";
import { getDeleteActionCreatorForResumeEntity } from "@/utils/redux.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteResumeEntity<T extends ResumeEntity>(
  path: string,
  entity: ResumeEntityArrayKeys
) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ resumeId, id }: { resumeId: string; id: string }) =>
      deleteResumeEntityById<T>(resumeId, id, path),
    onSuccess: (data, variables) => {
      dispatch(getDeleteActionCreatorForResumeEntity(entity)(data.id));
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForDeleteEntities(data, variables, entity)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes", variables.resumeId], exact: true },
        getSetQueryDataForDeleteEntityByResumeId(data, variables, entity)
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
