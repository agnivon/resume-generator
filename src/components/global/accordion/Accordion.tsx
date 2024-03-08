import { SVGIconComponentType } from "@/types/utility.types";
import { classNames } from "@/utils";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

export type AccordionItem = {
  show?: boolean;
  setShow?: (show: boolean) => void;
  heading?: React.ReactNode;
  content?: React.ReactNode;
  headingClassNames?: string;
  contentClassNames?: string;
  ArrowIcon?: SVGIconComponentType;
};

const BASE_BUTTON_CLASSES =
  "flex items-center justify-between w-full p-5 font-medium rtl:text-right focus:ring-4 gap-3 border border-b-0 group-first:rounded-t-xl [&:not(.show)]:group-last:border-b [&:not(.show)]:group-last:rounded-b-xl";

const BASE_BUTTON_COLOR_CLASSES =
  "border-gray-200 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 [&.show]:text-black dark:[&.show]:text-white [&.show]:bg-gray-100 [&.show]:dark:bg-gray-800";

const BUTTON_SHOW_CLASSES = "show";

export default React.memo(function Accordion(props: AccordionItem) {
  const {
    show = false,
    setShow,
    heading,
    content,
    ArrowIcon = ChevronDownIcon,
    headingClassNames,
    contentClassNames,
  } = props;

  return (
    <div className="group">
      <button
        type="button"
        className={classNames(
          BASE_BUTTON_CLASSES,
          BASE_BUTTON_COLOR_CLASSES,
          show ? BUTTON_SHOW_CLASSES : "",
          headingClassNames
        )}
        onClick={() => setShow?.(!show)}
      >
        {heading}
        <ArrowIcon
          className={classNames(
            "w-6 h-6 shrink-0 transition-transform",
            show ? "rotate-180" : ""
          )}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </button>
      {show && (
        <div
          className={classNames(
            "p-5 border-gray-200 dark:border-gray-700 dark:bg-gray-900 border border-b-0 group-last:border-b group-last:rounded-b-xl group",
            contentClassNames
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
});
