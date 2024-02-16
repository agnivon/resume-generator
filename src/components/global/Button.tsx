import { classNames } from "@/utils";
import React, {
  ButtonHTMLAttributes,
  ComponentProps,
  MouseEventHandler,
} from "react";
import Spinner, { SpinnerColor, SpinnerSize } from "./Spinner";

export enum ButtonColor {
  BLUE = "blue",
  ALT = "alternative",
  DARK = "dark",
  LIGHT = "light",
  GREEN = "green",
  CYAN = "cyan",
  TEAL = "teal",
  LIME = "lime",
  RED = "red",
  PINK = "pink",
  PURPLE = "purple",
  GREEN_TO_BLUE = "green-to-blue",
}

export enum ButtonSize {
  EXTRA_SMALL = "extra-small",
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
  EXTRA_LARGE = "extra-large",
}

export enum ButtonVariant {
  DEFAULT = "default",
  OUTLINE = "outline",
  GRADIENT_MONO = "gradient-monochrome",
  GRADIENT_DUO = "gradient-duotone",
  /* GRADIENT_OUTLINE = "gradient-outline", */
}

export type ButtonProps = ComponentProps<"button"> & {
  label?: React.ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  color?: ButtonColor;
  size?: ButtonSize;
  Icon?: React.FC<Omit<React.SVGProps<SVGSVGElement>, "ref">>;
  variant?: ButtonVariant;
  pilled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  processing?: boolean;
  disabled?: boolean;
  customClassNames?: string | undefined;
  customIconClassNames?: string | undefined;
};

const BASE_CLASSES =
  "inline-flex justify-center items-center focus:ring-4 focus:outline-none font-medium text-center disabled:cursor-not-allowed ease-in duration-600";

const SIZE_CLASSES = {
  [ButtonSize.EXTRA_SMALL]: "px-2 py-2 text-xs",
  [ButtonSize.SMALL]: "px-3 py-2 text-sm",
  [ButtonSize.BASE]: "text-base px-5 py-2.5",
  [ButtonSize.LARGE]: "px-5 py-3 text-lg",
  [ButtonSize.EXTRA_LARGE]: "text-xl px-6 py-3.5",
} as const;

const COLOR_CLASSES: { [index: string]: { [index: string]: string } } = {
  [ButtonVariant.DEFAULT]: {
    [ButtonColor.BLUE]:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ",
    [ButtonColor.ALT]:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    [ButtonColor.DARK]:
      "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    [ButtonColor.LIGHT]:
      "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    [ButtonColor.RED]:
      "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  },
  [ButtonVariant.GRADIENT_MONO]: {
    [ButtonColor.BLUE]:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800",
    [ButtonColor.GREEN]:
      "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800",
    [ButtonColor.TEAL]:
      "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800",
    [ButtonColor.LIME]:
      "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800",
    [ButtonColor.RED]:
      "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800",
    [ButtonColor.CYAN]:
      "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800",
    [ButtonColor.PINK]:
      "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800",
    [ButtonColor.PURPLE]:
      "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800",
  },
  [ButtonVariant.GRADIENT_DUO]: {
    [ButtonColor.GREEN_TO_BLUE]:
      "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800",
  },
  [ButtonVariant.OUTLINE]: {
    [ButtonColor.BLUE]:
      "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
    [ButtonColor.DARK]:
      "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
    [ButtonColor.LIGHT]:
      "text-gray-900 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
  },
};

const DISABLED_COLOR_CLASSES =
  "disabled:text-gray-700 disabled:dark:text-gray-100 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:dark:bg-gray-600 disabled:hover:dark:bg-gray-600 disabled:bi-none disabled:hover:bi-none";

const Button = (props: ButtonProps) => {
  const {
    label,
    type = "button",
    color = ButtonColor.BLUE,
    variant = ButtonVariant.DEFAULT,
    size = ButtonSize.BASE,
    Icon,
    pilled = false,
    onClick,
    disabled,
    processing,
    customClassNames,
    customIconClassNames: iconClassNames,
    ...rest
  } = props;

  const pilledClasses = pilled ? "rounded-full" : "rounded-lg";

  return (
    <button
      type={type}
      className={classNames(
        BASE_CLASSES,
        COLOR_CLASSES[variant][color],
        SIZE_CLASSES[size],
        pilledClasses,
        DISABLED_COLOR_CLASSES,
        customClassNames
      )}
      disabled={disabled || processing}
      onClick={onClick}
      {...rest}
    >
      {processing && (
        <Spinner
          customClassNames="inline mr-3"
          color={SpinnerColor.GRAY}
          size={SpinnerSize.SMALL}
        />
      )}
      {Icon && (
        <Icon
          className={classNames(
            "w-5 h-5",
            label ? "-ml-1 mr-2" : "",
            iconClassNames
          )}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
