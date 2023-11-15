import { classNames } from "@/utils";
import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { DOMAttributes } from "react";

type Step = {
  current: boolean;
  done: boolean;
  label: React.ReactNode;
  onClick?: DOMAttributes<HTMLSpanElement>["onClick"];
};

type StepperStepProps = Step & {
  idx: number;
  last: boolean;
  showNextIcon: boolean;
};

const StepperStep = (props: StepperStepProps) => {
  const { current, done, label, idx, onClick, last, showNextIcon } = props;
  return (
    <li
      className={classNames(
        "flex items-center flex-grow",
        current || done ? "text-blue-600 dark:text-blue-500" : ""
      )}
    >
      <span
        onClick={onClick}
        className={classNames(
          "flex items-center",
          onClick ? "cursor-pointer" : "cursor-default"
        )}
      >
        {done ? (
          <CheckCircleIcon className="w-5 h-5 mr-2" />
        ) : (
          <span
            className={classNames(
              "flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ",
              current ? "border-blue-600 dark:border-blue-500" : ""
            )}
          >
            {idx + 1}
          </span>
        )}
        <span className="shrink-0">{label}</span>
        {!last && showNextIcon && (
          <ChevronDoubleRightIcon
            className={classNames(
              "w-5 h-5 ml-2 2xl:ml-4",
              done ? "text-blue-600 dark:text-blue-500" : ""
            )}
          />
        )}
      </span>
    </li>
  );
};

type StepperProps = {
  steps: Step[];
  containerClassNames?: string;
};

export default function Stepper(props: StepperProps) {
  const { steps, containerClassNames } = props;
  return (
    <ol
      className={classNames(
        "flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 2xl:space-x-4",
        containerClassNames
      )}
    >
      {steps.map((step, idx) => (
        <StepperStep
          {...step}
          key={`${step.label}-${idx}`}
          idx={idx}
          last={idx === steps.length - 1}
          showNextIcon={true}
        />
      ))}
    </ol>
  );
}
