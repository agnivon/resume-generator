import React from "react";
import { v4 as uuidv4 } from "uuid";

type PopoverProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
};

export default function Popover(props: PopoverProps) {
  const { children, content } = props;
  const { current: id } = React.useRef<string>(uuidv4());
  return (
    <>
      <div data-popover-target={id}>{children}</div>
      <div
        data-popover
        id={id}
        role="tooltip"
        className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        {content}
        <div data-popper-arrow></div>
      </div>
    </>
  );
}
