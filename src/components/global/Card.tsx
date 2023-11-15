import { classNames } from "@/utils";
import MotionDiv, {
  MotionDivProps,
} from "./motion/MotionDiv";

type CardProps = {
  children?: React.ReactNode;
  customClassNames?: string | undefined;
  onClick?: MotionDivProps["onClick"];
};

const Card = (props: CardProps) => {
  return (
    <MotionDiv
      className={classNames(
        "block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        props.customClassNames
      )}
      onClick={props.onClick}
    >
      {props.children}
    </MotionDiv>
  );
};

export default Card;
