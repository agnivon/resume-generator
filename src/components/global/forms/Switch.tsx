import { classNames } from "@/utils";
import SubText from "./SubText";

export type SwitchProps = {
  label?: string | undefined;
  required?: boolean;
  disabled?: boolean;
  value?: boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
  errorText?: string;
  helperText?: string;
  showSubText?: boolean;
};

const BASE_CLASSES =
  "w-11 h-6 shrink-0 rounded-full peer peer-focus:ring-4 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-0.5 after:left-[2px]  after:border after:rounded-full after:h-5 after:w-5 after:transition-all";

const COLOR_CLASSES =
  "bg-gray-200 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:border-white after:bg-white after:border-gray-300 dark:border-gray-600 peer-checked:bg-blue-600";

const Switch = (props: SwitchProps) => {
  const {
    label,
    value,
    onChange,
    required,
    disabled,
    containerClassNames,
    inputClassNames,
    errorText,
    helperText,
    showSubText = true,
    ...rest
  } = props;
  return (
    <div className={containerClassNames}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          //defaultValue=""
          className="sr-only peer"
          disabled={disabled}
          required={required}
          checked={value}
          onChange={onChange}
          {...rest}
        />
        <div
          className={classNames(BASE_CLASSES, COLOR_CLASSES, inputClassNames)}
        />
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      </label>
      {showSubText && <SubText errorText={errorText} helperText={helperText} />}
    </div>
  );
};

export default Switch;
