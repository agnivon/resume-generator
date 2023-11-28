import { useModalContext } from "@/context/ModalContextProvider";
import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";

type ModalHeaderProps = {
  children?: React.ReactNode;
};

const CloseButton = () => {
  const { onClose } = useModalContext();
  return (
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      onClick={onClose}
    >
      <XMarkIcon className="w-5 h-5" />
      <span className="sr-only">Close modal</span>
    </button>
  );
};

const ModalHeader = ({ children }: ModalHeaderProps) => {
  const { popup } = useModalContext();
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-t ",
        !popup ? "border-b dark:border-gray-600 p-4" : "p-2"
      )}
    >
      {children && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h3>
      )}
      <CloseButton />
    </div>
  );
};

export default ModalHeader;
