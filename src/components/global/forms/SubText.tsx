import { classNames } from "@/utils";

export default function SubText({
  errorText,
  helperText,
}: {
  errorText?: React.ReactNode;
  helperText?: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        "mt-2 text-sm min-h-[1.25rem]",
        errorText
          ? "text-red-600 dark:text-red-500"
          : helperText
          ? "text-gray-500 dark:text-gray-400"
          : ""
      )}
    >
      {errorText || helperText}
    </div>
  );
}
