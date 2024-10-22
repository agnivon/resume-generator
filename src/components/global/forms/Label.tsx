import { classNames } from "@/utils";

type LabelProps = {
  label?: string;
  errorText?: string;
  customClassNames?: string;
};

export default function Label({
  label,
  errorText,
  customClassNames,
}: LabelProps) {
  return (
    <label
      htmlFor={label}
      className={classNames(
        "block mb-2 text-sm font-medium",
        !errorText
          ? " text-gray-900 dark:text-white"
          : "text-red-700 dark:text-red-500",
        customClassNames
      )}
    >
      {label}
    </label>
  );
}
