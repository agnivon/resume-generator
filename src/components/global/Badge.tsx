import { classNames } from "@/utils";
import { DOMAttributes } from "react";

const BASE_CLASSES = {
  default:
    "inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-md",
  bordered:
    "inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-md border",
};

const COLOR_CLASSES = {
  default: {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    //gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",

    // info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
    // gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
    // failure:
    //   "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
    // success:
    //   "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
    // warning:
    //   "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
    // indigo:
    //   "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-300",
    // purple:
    //   "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-300",
    // pink: "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900 group-hover:bg-pink-200 dark:group-hover:bg-pink-300",
    // blue: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-300",
    // cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
    // dark: "bg-gray-600 text-gray-100 dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-500 dark:group-hover:bg-gray-700",
    // light:
    //   "bg-gray-200 text-gray-800 dark:bg-gray-400 dark:text-gray-900 group-hover:bg-gray-300 dark:group-hover:bg-gray-500",
    // green:
    //   "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-300",
    // lime: "bg-lime-100 text-lime-800 dark:bg-lime-200 dark:text-lime-900 group-hover:bg-lime-200 dark:group-hover:bg-lime-300",
    // red: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300",
    // teal: "bg-teal-100 text-teal-800 dark:bg-teal-200 dark:text-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-300",
    // yellow:
    //   "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300",
  },
  bordered: {
    blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-500",
    red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400",
    green:
      "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border-yellow-300",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border-indigo-400",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border-purple-400",
    pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border-pink-400",
    //gray: "",
  },
};

export const BADGE_COLORS = Object.keys(COLOR_CLASSES.default) as BadgeColor[];

const SIZE_CLASSES = {
  xs: "text-xs",
  sm: "text-sm",
};

export type BadgeColor = keyof (typeof COLOR_CLASSES)["default" | "bordered"];

export type BadgeProps = DOMAttributes<HTMLSpanElement> & {
  customClassNames?: string;
  children?: React.ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  type?: "default" | "bordered";
  color?: BadgeColor;
  pilled?: boolean;
};

export default function Badge(props: BadgeProps) {
  const {
    children,
    customClassNames,
    size = "sm",
    type = "default",
    color = "blue",
    pilled = false,
    ...rest
  } = props;
  return (
    <span
      className={classNames(
        BASE_CLASSES[type],
        COLOR_CLASSES[type][color],
        SIZE_CLASSES[size],
        pilled ? "!rounded-full" : "",
        customClassNames
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
