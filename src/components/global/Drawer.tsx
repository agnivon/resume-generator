import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
import MotionDiv from "./motion/MotionDiv";
import { AnimatePresence } from "framer-motion";
import React from "react";

export type DrawerProps = {
  show?: boolean;
  onClose?: () => void;
  position?: "left" | "right";
  children?: React.ReactNode;
  customClasses?: string;
};

const getPositionClasses = (position: "left" | "right") => {
  return position === "left" ? "left-0" : "right-0";
};

const getAnimationProps = (position: "left" | "right") => {
  return {
    initial: {
      opacity: 0.5,
      translateX: position === "left" ? "-100%" : "100%",
    },
    animate: { opacity: 1, translateX: "0%" },
    exit: { opacity: 0.5, translateX: position === "left" ? "-100%" : "100%" },
    transition: { ease: "easeInOut", duration: 0.1 },
  };
};

export default React.memo(function Drawer(props: DrawerProps) {
  const { show, children, onClose, position = "left", customClasses } = props;
  const positionClasses = getPositionClasses(position);
  const animationProps = getAnimationProps(position);
  return (
    <>
      <AnimatePresence>
        {show && (
          <MotionDiv
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto hide-scrollbar md:inset-0 h-screen max-h-full bg-black bg-opacity-50"
            onClick={onClose}
          >
            <MotionDiv
              className={classNames(
                "fixed top-0 z-40 h-screen p-6 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800",
                positionClasses,
                customClasses
              )}
              {...animationProps}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <XMarkIcon className="w-5 h-5" />
                <span className="sr-only">Close menu</span>
              </button>
              {children}
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
});
