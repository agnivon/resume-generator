import { classNames } from "@/utils";
import { Tab, TabLoadingIndicator } from "./DefaultTabs";

type TabComponentProps = Tab;

const BASE_CLASSES = "inline-block px-4 py-3 rounded-lg cursor-pointer";

const DISABLED_CLASSES = "text-gray-400 pointer-events-none dark:text-gray-500";

const CURRENT_COLOR_CLASSES = "text-white bg-blue-600";

const BASE_COLOR_CLASSES =
  "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white";

const TabComponent = (props: TabComponentProps) => {
  const { label, current, disabled, loading = false, onClick, Icon } = props;
  return (
    <li className="mr-2">
      <div
        className={classNames(
          BASE_CLASSES,
          disabled || loading
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
            <span>{label}</span>
          </div>
        ) : (
          <TabLoadingIndicator />
        )}
      </div>
    </li>
  );
};

type PilledTabsProps = {
  tabs: Tab[];
  containerClassNames?: string;
};

export default function PilledTabs(props: PilledTabsProps) {
  const { tabs, containerClassNames } = props;
  return (
    <ul
      className={classNames(
        "flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400",
        containerClassNames
      )}
    >
      {tabs.map((tab, idx) => (
        <TabComponent {...tab} key={`${tab.label}-${idx}`} />
      ))}
    </ul>
  );
}
