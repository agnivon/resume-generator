import { classNames } from "@/utils";
import Label from "./Label";
import SubText from "./SubText";
import { ComponentProps, Key } from "react";

export type SelectProps = ComponentProps<"select"> & {
  label?: string | undefined;
  size?: SelectSize;
  helperText?: string;
  errorText?: string;
  options: {
    key: string | number | null | undefined;
    value: string | number;
  }[];
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
  showSubText?: boolean;
};

export enum SelectSize {
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
}

const BASE_CLASSES =
  "border rounded-lg block w-full cursor-pointer disabled:cursor-not-allowed";

const SIZE_CLASSES = {
  [SelectSize.SMALL]: "p-2 text-sm",
  [SelectSize.BASE]: "p-2.5 text-sm",
  [SelectSize.LARGE]: "px-4 py-3 text-base",
};

const COLOR_CLASSES =
  "bg-gray-50 disabled:bg-gray-100 border-gray-300 text-gray-900 disabled:text-gray-400 dark:disabled:text-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const ERROR_COLOR_CLASSES =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 block w-full dark:bg-red-100 dark:border-red-400";

const Select = (props: SelectProps) => {
  const {
    label,
    size = SelectSize.BASE,
    placeholder,
    helperText,
    errorText,
    options,
    value,
    onChange,
    onKeyDown,
    required,
    disabled,
    containerClassNames,
    inputClassNames,
    showSubText = true,
    ...rest
  } = props;

  return (
    <div className={containerClassNames}>
      {label && <Label label={label} errorText={errorText} />}
      <div className="relative">
        <select
          id={label}
          className={classNames(
            BASE_CLASSES,
            SIZE_CLASSES[size],
            errorText ? ERROR_COLOR_CLASSES : COLOR_CLASSES,
            inputClassNames
          )}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...rest}
        >
          {options.map((option) => (
            <option value={option.value} key={option.key}>
              {option.key}
            </option>
          ))}
        </select>
        {showSubText && (
          <SubText errorText={errorText} helperText={helperText} />
        )}
      </div>
    </div>
  );
};

export default Select;
