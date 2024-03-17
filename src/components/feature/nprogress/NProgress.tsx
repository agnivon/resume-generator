"use client";

import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import NProgress from "nprogress";
import React from "react";

export default function NProgressBar() {
  const { globalRunning } = useIsGlobalQueryRunning();

  React.useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });
  }, []);

  React.useEffect(() => {
    if (globalRunning) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [globalRunning]);
  return <></>;
}
