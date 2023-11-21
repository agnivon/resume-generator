"use client";

import Button, { ButtonColor } from "@/components/global/Button";
import ErrorMessage from "@/components/global/ErrorMessage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-6">
        <ErrorMessage message={error.message} orientation="full" />
        <Button
          label="Try again"
          color={ButtonColor.ALT}
          onClick={() => reset()}
        />
      </div>
    </div>
  );
}
