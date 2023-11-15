import { getCompleteResumeById } from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/useAppDispatch";

export default function useGetCompleteResumeById(id: string) {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["resumes", id],
    queryFn: () =>
      getCompleteResumeById(id).then((data) => {
        if (data) {
          dispatch(resumeSlice.actions.upsertOneCompleteResume(data));
        }
        return data;
      }),
    staleTime: Infinity,
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
