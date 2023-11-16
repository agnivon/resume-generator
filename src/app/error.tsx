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
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-2">
      <ErrorMessage message={error.message} />
      <Button
        label="Try again"
        color={ButtonColor.ALT}
        onClick={() => reset()}
      />
    </div>
  );
}
