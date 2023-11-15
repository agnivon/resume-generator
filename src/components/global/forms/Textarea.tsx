import { classNames } from "@/utils";
import Label from "./Label";
import SubText from "./SubText";
import { ComponentProps } from "react";

export type TextareaProps = ComponentProps<"textarea"> & {
  label?: string | undefined;
  size?: TextareaSize;
  helperText?: string;
  errorText?: string;
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
};

export enum TextareaSize {
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
}

const BASE_CLASSES = "block w-full rounded-lg border";

const SIZE_CLASSES = {
  [TextareaSize.SMALL]: "sm:p-2 text-sm",
  [TextareaSize.BASE]: "p-2.5 text-base",
  [TextareaSize.LARGE]: "p-4 text-lg",
};

const COLOR_CLASSES =
  "text-gray-900 bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:text-gray-400 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const ERROR_COLOR_CLASSES =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 block w-full dark:bg-red-100 dark:border-red-400";

const Textarea = (props: TextareaProps) => {
  const {
    label,
    rows = 4,
    size = TextareaSize.BASE,
    placeholder,
    value,
    onChange,
    helperText,
    errorText,
    required,
    disabled,
    readOnly,
    containerClassNames,
    inputClassNames,
    ...rest
  } = props;
  return (
    <>
      <div className={containerClassNames}>
        {label && <Label label={label} errorText={errorText} />}
        <textarea
          rows={rows}
          className={classNames(
            BASE_CLASSES,
            SIZE_CLASSES[size],
            errorText ? ERROR_COLOR_CLASSES : COLOR_CLASSES,
            inputClassNames
          )}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          {...rest}
        />
        <SubText errorText={errorText} helperText={helperText} />
      </div>
    </>
  );
};

export default Textarea;
