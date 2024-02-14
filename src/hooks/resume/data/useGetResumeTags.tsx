import { getResumeTags } from "@/endpoints/resume.endpoints";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useGetResumeTags() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["resume-tags"],
    queryFn: () =>
      getResumeTags().then((data) => {
        if (data) {
          dispatch(resumeSlice.actions.upsertManyResumeTags(data));
        }
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
