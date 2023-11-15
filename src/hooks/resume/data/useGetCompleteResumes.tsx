import { getCompleteResumes } from "@/endpoints/resume.endpoints";
import resumeSlice from "@/redux/slices/resumeSlice";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/useAppDispatch";

export default function useGetCompleteResumes() {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["resumes"],
    queryFn: () =>
      getCompleteResumes().then((data) => {
        dispatch(resumeSlice.actions.upsertManyCompleteResumes(data));
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
