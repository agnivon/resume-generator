import { useModalContext } from "@/context/ModalContextProvider";
import { classNames } from "@/utils";

type ModalBodyProps = {
  children?: React.ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => {
  const { popup } = useModalContext();

  return (
    <div className={classNames("p-6 space-y-6", popup ? "!pt-0" : "")}>
      {children}
    </div>
  );
};

export default ModalBody;
