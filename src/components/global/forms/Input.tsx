import { classNames } from "@/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { ComponentProps } from "react";
import Label from "./Label";
import SubText from "./SubText";

export type InputProps = Omit<ComponentProps<"input">, "ref"> & {
  label?: string | undefined;
  size?: InputSize;
  helperText?: string;
  errorText?: string;
  value?: string | number | readonly string[] | undefined;
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
};

export enum InputSize {
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
}

const BASE_CLASSES =
  "border font-medium rounded-lg block w-full shadow-sm dark:shadow-sm-light disabled:cursor-not-allowed";

const SIZE_CLASSES = {
  [InputSize.SMALL]: "sm:p-2 text-sm",
  [InputSize.BASE]: "p-2.5 text-base",
  [InputSize.LARGE]: "p-4 text-lg",
};

const COLOR_CLASSES =
  "bg-gray-50 disabled:bg-gray-100 border-gray-300 text-gray-900 disabled:text-gray-400 dark:disabled:text-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const ERROR_COLOR_CLASSES =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 block w-full dark:bg-red-100 dark:border-red-400";

const Input = (props: InputProps) => {
  const {
    label,
    type = "text",
    size = InputSize.BASE,
    placeholder,
    helperText,
    errorText,
    value,
    onChange,
    onKeyDown,
    required,
    disabled,
    readOnly,
    containerClassNames,
    inputClassNames,
    ...rest
  } = props;

  const [modifiedType, setModifiedType] = React.useState<string>(type);

  return (
    <>
      <div className={containerClassNames}>
        {label && <Label label={label} errorText={errorText} />}
        <div className="relative">
          {type === "password" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              {modifiedType === "password" && (
                <EyeIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setModifiedType("text")}
                />
              )}
              {modifiedType === "text" && (
                <EyeSlashIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setModifiedType("password")}
                />
              )}
            </div>
          )}
          <input
            type={modifiedType}
            id={label}
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
            onKeyDown={onKeyDown}
            {...rest}
          />
        </div>
        <SubText errorText={errorText} helperText={helperText} />
      </div>
    </>
  );
};

export default React.memo(Input);
