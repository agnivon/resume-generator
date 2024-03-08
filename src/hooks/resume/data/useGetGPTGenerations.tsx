import { getGPTGenerations } from "@/endpoints/resume.endpoints";
import { GPTGeneration, ResumeV2 } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useGetGPTGenerations(
  resumeId: ResumeV2["id"],
  type: GPTGeneration["type"]
) {
  const query = useQuery({
    queryKey: ["gpt-generations", resumeId, type],
    queryFn: () => getGPTGenerations(resumeId, type),
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
