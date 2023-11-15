import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function useIsGlobalQueryRunning() {
  const globalFetching = useIsFetching() > 0;

  const globalMutating = useIsMutating() > 0;

  return {
    globalFetching,
    globalMutating,
    globalRunning: globalFetching || globalMutating,
  };
}
