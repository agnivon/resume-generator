"use client";

import { classNames } from "@/utils";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  AlertTemplateProps,
  Provider,
  positions,
  transitions,
} from "react-alert";
import { useThemeContext } from "./ThemeContextProvider";

const ALERT_TEMPLATE_CONTAINER_COLOR_CLASSES = {
  info: "text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800",
  success:
    "text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-200 dark:border-green-800",
  error:
    "text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
};

const ALERT_TEMPLATE_CLOSE_BUTTON_COLOR_CLASSES = {
  info: "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700",
  success:
    "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700",
  error:
    "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700",
};

const AlertTemplate =
  /* (theme: Theme) => */
  ({ style, options, message, close }: AlertTemplateProps) => {
    const { theme } = useThemeContext();

    return (
      <div style={style} className={classNames(theme, "print-hidden")}>
        <div
          className={classNames(
            "flex p-4 mb-4 text-sm rounded-lg border",
            ALERT_TEMPLATE_CONTAINER_COLOR_CLASSES[options.type || "info"]
          )}
          role="alert"
        >
          <InformationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
          <span className="sr-only">{options.type}</span>
          <div className="mr-3 text-sm font-medium">{message}</div>
          <button
            type="button"
            className={classNames(
              "ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8",
              ALERT_TEMPLATE_CLOSE_BUTTON_COLOR_CLASSES[options.type || "info"]
            )}
            aria-label="Close"
            onClick={close}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Provider {...options} template={AlertTemplate}>
      {children}
    </Provider>
  );
};

export default AlertProvider;
