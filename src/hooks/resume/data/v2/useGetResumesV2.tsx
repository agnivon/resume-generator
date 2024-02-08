import { getResumesV2 } from "@/endpoints/resume.endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export default function useGetResumesV2() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["resumesV2"],
    queryFn: () =>
      getResumesV2().then((data) => {
        //dispatch(resumeSlice.actions.upsertManyCompleteResumes(data));
        data.forEach((resume) => {
          queryClient.setQueryData(["resumeV2", resume.id], resume);
        });
        return data;
      }),
    staleTime: Infinity,
    refetchOnMount: false,
  });

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
  } = query;

  return {
    query,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    status,
    fetchStatus,
  };
}
