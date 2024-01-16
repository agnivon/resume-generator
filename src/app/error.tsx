"use client";

import Button from "@/components/global/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center flex flex-col items-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
              500
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              {error.name}
            </p>
            <p className="mb-8 text-lg font-light text-gray-500 dark:text-gray-400">
              {error.message}
            </p>
            <Button
              label="Reload"
              //color={ButtonColor.ALT}
              //size={ButtonSize.SMALL}
              onClick={() => reset()}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
