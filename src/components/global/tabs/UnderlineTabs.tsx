import { classNames } from "@/utils";
import { Tab, TabLoadingIndicator } from "./DefaultTabs";

type TabComponentProps = Tab;

const BASE_CLASSES =
  "inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer";

const DISABLED_CLASSES = "text-gray-400 pointer-events-none dark:text-gray-500";

const CURRENT_COLOR_CLASSES =
  "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500";

const BASE_COLOR_CLASSES =
  "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

const TabComponent = (props: TabComponentProps) => {
  const { label, current, disabled, loading, onClick, Icon, customClassNames } =
    props;
  return (
    <li className="mr-2">
      <div
        className={classNames(
          BASE_CLASSES,
          loading || disabled
            ? DISABLED_CLASSES
            : current
            ? CURRENT_COLOR_CLASSES
            : BASE_COLOR_CLASSES,
          customClassNames
        )}
        onClick={onClick}
      >
        {!loading ? (
          <div>
            {Icon && (
              <Icon className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
            )}
            <span>{label}</span>
          </div>
        ) : (
          <TabLoadingIndicator />
        )}
      </div>
    </li>
  );
};

type UnderlineTabsProps = {
  tabs: Tab[];
  containerClassNames?: string;
  tabClassNames?: string;
};

export default function UnderlineTabs(props: UnderlineTabsProps) {
  const { tabs, containerClassNames, tabClassNames } = props;
  return (
    <div
      className={classNames(
        "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600",
        containerClassNames
      )}
    >
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab, idx) => (
          <TabComponent
            customClassNames={tabClassNames}
            {...tab}
            key={`${tab.label}-${idx}`}
          />
        ))}
      </ul>
    </div>
  );
}
