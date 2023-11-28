import ModalContextProvider from "@/context/ModalContextProvider";
import { classNames } from "@/utils";
import MotionDiv from "../motion/MotionDiv";
import React from "react";
import { AnimatePresence } from "framer-motion";

export type ModalProps = {
  onClose?: () => void;
  popup?: boolean;
  // position?: keyof ModalPositions;
  show?: boolean;
  size?: ModalSize;
  dismissible?: boolean;
  children?: React.ReactNode;
};

export enum ModalSize {
  SMALL = "small",
  DEFAULT = "default",
  LARGE = "large",
  EXTRA_LARGE = "extra-large",
}

const MODAL_SIZE_CLASSES = {
  [ModalSize.SMALL]: "max-w-md",
  [ModalSize.DEFAULT]: "max-w-lg",
  [ModalSize.LARGE]: "max-w-4xl",
  [ModalSize.EXTRA_LARGE]: "max-w-7xl",
};

const Modal = (props: ModalProps) => {
  const {
    show,
    dismissible,
    children,
    onClose,
    popup,
    size = ModalSize.DEFAULT,
  } = props;

  return (
    <ModalContextProvider popup={popup} onClose={onClose}>
      <AnimatePresence>
        {show && (
          <MotionDiv
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full bg-black bg-opacity-50"
            onClick={() => {
              if (dismissible && onClose) onClose();
            }}
          >
            <div
              className={classNames(
                "fixed inset-x-0 inset-y-0 mx-auto w-full max-h-full flex items-center justify-center",
                MODAL_SIZE_CLASSES[size]
              )}
            >
              {/* Modal content */}
              <div
                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </ModalContextProvider>
  );
};

export default React.memo(Modal);
