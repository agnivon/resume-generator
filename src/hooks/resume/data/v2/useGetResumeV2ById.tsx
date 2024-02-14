import { getResumeV2ById } from "@/endpoints/resume.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";
import resumeSlice from "@/redux/slices/resumeSlice";

export default function useGetResumeV2ById(id: string) {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["resumeV2", id],
    queryFn: () =>
      getResumeV2ById(id).then((data) => {
        if (data) {
          dispatch(resumeSlice.actions.upsertOneResumeV2(data));
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
