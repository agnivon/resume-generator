import { upsertResumeEntityById } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { ResumeEntityArray, ResumeEntityArrayKeys } from "@/types/resume.types";
import {
  getSetQueryDataForEntities,
  getSetQueryDataForEntityByResumeId,
} from "@/utils/query.utils";
import { getUpsertActionForResumeEntities } from "@/utils/redux.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpsertResumeEntity<T extends ResumeEntityArray>(
  path: string,
  entity: ResumeEntityArrayKeys
) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ resumeId, entities }: { resumeId: string; entities: T }) =>
      upsertResumeEntityById(resumeId, entities, path),
    onSuccess: (data, variables) => {
      dispatch(getUpsertActionForResumeEntities(entity, data));
      queryClient.setQueriesData(
        { queryKey: ["resumes"], exact: true },
        getSetQueryDataForEntities(data, variables, entity)
      );
      queryClient.setQueriesData(
        { queryKey: ["resumes", variables.resumeId], exact: true },
        getSetQueryDataForEntityByResumeId(data, variables, entity)
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
