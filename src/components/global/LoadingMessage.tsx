import { classNames } from "@/utils";
import Spinner, { SpinnerColor } from "./Spinner";

type LoadingMessageProps = {
  orientation?: "full" | "screen";
};

const getOrientationClass = (orientation: "full" | "screen") =>
  orientation === "screen" ? "h-screen" : "h-full";

const LoadingMessage = (props: LoadingMessageProps) => {
  const { orientation = "screen" } = props;
  const orientationClass = getOrientationClass(orientation);
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center",
        orientationClass
      )}
    >
      <Spinner color={SpinnerColor.BLUE} />
    </div>
  );
};

export default LoadingMessage;
