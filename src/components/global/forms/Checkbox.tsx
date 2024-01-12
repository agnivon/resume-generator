import { classNames } from "@/utils";
import { ComponentProps } from "react";
import Label from "./Label";
import SubText from "./SubText";

export type CheckboxProps = Omit<ComponentProps<"input">, "ref" | "type"> & {
  label?: string | undefined;
  helperText?: string;
  errorText?: string;
  containerClassNames?: string | undefined;
  checkboxClassNames?: string | undefined;
  showSubText?: boolean;
};

const BASE_CLASSES = "w-4 h-4 rounded focus:ring-2 cursor-pointer disabled:cursor-not-allowed";

const COLOR_CLASSES =
  "text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600";

const ERROR_COLOR_CLASSES =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 block w-full dark:bg-red-100 dark:border-red-400";

const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    errorText,
    helperText,
    containerClassNames,
    checkboxClassNames,
    showSubText = true,
    ...rest
  } = props;
  return (
    <div className={containerClassNames}>
      <div className="flex items-center">
        <input
          id={label}
          type="checkbox"
          className={classNames(
            BASE_CLASSES,
            COLOR_CLASSES,
            errorText ? ERROR_COLOR_CLASSES : COLOR_CLASSES,
            checkboxClassNames
          )}
          {...rest}
        />
        {label && (
          <Label
            label={label}
            errorText={errorText}
            customClassNames="!mb-0 ms-2"
          />
        )}
      </div>
      {showSubText && <SubText errorText={errorText} helperText={helperText} />}
    </div>
  );
};

export default Checkbox;
