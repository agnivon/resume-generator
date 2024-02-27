"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorCard() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <>
      {error?.includes("OAuthAccountNotLinked") && (
        <div
          className="p-4 w-80 rounded-lg bg-blue-50 dark:bg-blue-900"
          role="alert"
        >
          <div className="text-sm text-blue-800 dark:text-blue-400">
            <p className="font-medium">
              {
                "You have already signed in with a different provider that is associated with the same email address. Please sign in using that same provider."
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
}
