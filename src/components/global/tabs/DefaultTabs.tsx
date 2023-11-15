import { SVGIconComponentType } from "@/types/utility.types";
import { classNames } from "@/utils";
import { DOMAttributes } from "react";

export type Tab = {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  current?: boolean;
  Icon?: SVGIconComponentType;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
};

type TabComponentProps = Tab;

const BASE_CLASSES = "inline-block p-4 rounded-t-lg active cursor-pointer";

const DISABLED_CLASSES = "text-gray-400 pointer-events-none dark:text-gray-500";

const CURRENT_COLOR_CLASSES =
  "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500";

const BASE_COLOR_CLASSES =
  "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

export const TabLoadingIndicator = () => (
  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 animate-pulse mt-1"></div>
);

const TabComponent = (props: TabComponentProps) => {
  const { label, current, disabled, loading, onClick, Icon } = props;
  return (
    <li className="mr-2">
      <div
        className={classNames(
          BASE_CLASSES,
          loading || disabled
            ? DISABLED_CLASSES
            : current
            ? CURRENT_COLOR_CLASSES
            : BASE_COLOR_CLASSES
        )}
        onClick={onClick}
      >
        {!loading ? (
          <div>
            {Icon && (
              <Icon className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
            )}
            <span>{label}</span>{" "}
          </div>
        ) : (
          <TabLoadingIndicator />
        )}
      </div>
    </li>
  );
};

type DefaultTabsProps = {
  tabs: Tab[];
  containerClassNames?: string;
};

export default function DefaultTabs(props: DefaultTabsProps) {
  const { tabs, containerClassNames } = props;
  return (
    <ul
      className={classNames(
        "flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400",
        containerClassNames
      )}
    >
      {tabs.map((tab, idx) => (
        <TabComponent {...tab} key={`${tab.label}-${idx}`} />
      ))}
    </ul>
  );
}
