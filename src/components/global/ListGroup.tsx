import { SVGIconComponentType } from "@/types/utility.types";
import { classNames } from "@/utils";
import React, { DOMAttributes } from "react";

export type ListItem = {
  label: string;
  content: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  Icon?: SVGIconComponentType;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
};

type ListItemProps = ListItem & { first?: boolean; last?: boolean };

const BASE_CLASSES =
  "relative inline-flex items-center text-base w-full px-4 py-2 font-medium cursor-pointer first:rounded-t-lg last:rounded-b-lg";

const DISABLED_COLOR_CLASSES =
  "bg-gray-100 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400";

const SELECTED_COLOR_CLASSES =
  "text-white bg-blue-700 cursor-pointer focus:outline-none dark:bg-gray-800";

const BASE_COLOR_CLASSES =
  "hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white";

const NOT_LAST_CLASSES = "border-b border-gray-200 dark:border-gray-600";

//const LAST_CLASSES = "rounded-b-lg";

//const FIRST_CLASSES = "rounded-t-lg";

export const ListItem = React.memo((props: ListItemProps) => {
  const { content, Icon, onClick, selected, disabled, first, last } = props;

  return (
    <div
      className={classNames(
        BASE_CLASSES,
        disabled
          ? DISABLED_COLOR_CLASSES
          : selected
          ? SELECTED_COLOR_CLASSES
          : BASE_COLOR_CLASSES,
        !last ? NOT_LAST_CLASSES : ""
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4 mr-2.5" />}
      {content}
    </div>
  );
});

ListItem.displayName = "ListItem";

type ListGroupProps = {
  items: ListItemProps[];
  containerCustomClasses?: string;
};

export default React.memo(function ListGroup(props: ListGroupProps) {
  const { items, containerCustomClasses } = props;
  return (
    <div
      className={classNames(
        "w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
        containerCustomClasses
      )}
    >
      {items.map((item, idx) => (
        <ListItem
          {...item}
          key={`${item.label}-${idx}`}
          first={idx === 0}
          last={idx === items.length - 1}
        />
      ))}
    </div>
  );
});
