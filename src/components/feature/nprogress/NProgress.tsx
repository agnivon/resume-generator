"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React from "react";
import NProgress from "nprogress";

export default function NProgressBar() {
  const globalFetching =
    useIsFetching({
      predicate: (query) => {
        return !query.queryKey.includes("gpt-generations");
      },
    }) > 0;

  const globalMutating = useIsMutating() > 0;

  React.useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });
  }, []);

  React.useEffect(() => {
    if (globalFetching || globalMutating) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [globalFetching, globalMutating]);
  return <></>;
}
