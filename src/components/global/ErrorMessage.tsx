import { classNames } from "@/utils";
import Spinner, { SpinnerColor } from "./Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type ErrorMessageProps = {
  orientation?: "full" | "screen";
  message?: React.ReactNode;
};

const getOrientationClass = (orientation: "full" | "screen") =>
  orientation === "screen" ? "h-screen" : "h-full";

const ErrorMessage = (props: ErrorMessageProps) => {
  const { orientation = "screen", message } = props;
  const orientationClass = getOrientationClass(orientation);
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center",
        orientationClass
      )}
    >
      <div>
        <ExclamationCircleIcon className="h-10 w-10 dark:text-white text-gray-500" />
      </div>
      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage;
