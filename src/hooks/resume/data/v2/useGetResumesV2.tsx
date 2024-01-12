import { getResumesV2 } from "@/endpoints/resume.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../../redux/useAppDispatch";

export default function useGetResumesV2() {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["resumesV2"],
    queryFn: () =>
      getResumesV2().then((data) => {
        //dispatch(resumeSlice.actions.upsertManyCompleteResumes(data));
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
