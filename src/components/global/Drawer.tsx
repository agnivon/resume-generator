import { classNames } from "@/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";
import MotionDiv from "./motion/MotionDiv";
import { AnimatePresence } from "framer-motion";
import React from "react";

export type DrawerProps = {
  show?: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  children?: React.ReactNode;
  customClasses?: string;
};

const getPositionClasses = (position: DrawerProps["position"] = "left") => {
  const classes = {
    left: "left-0 top-0 h-screen w-80",
    right: "right-0 top-0 h-screen w-80",
    top: "top-0 left-0 right-0 w-full h-80",
    bottom: "bottom-0 left-0 right-0 w-full h-80",
  };

  return classes[position];
};

const getAnimationProps = (position: DrawerProps["position"]) => {
  const translate = {
    translateX:
      position === "left" ? "-100%" : position === "right" ? "100%" : undefined,
    translateY:
      position === "top" ? "-100%" : position === "bottom" ? "100%" : undefined,
  };
  return {
    initial: {
      opacity: 0.5,
      ...translate,
    },
    animate: { opacity: 1, translateX: "0%", translateY: "0%" },
    exit: { opacity: 0.5, ...translate },
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
            className="rg-drawer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto hide-scrollbar md:inset-0 h-screen max-h-full bg-black bg-opacity-50"
            onClick={onClose}
          >
            <MotionDiv
              className={classNames(
                "fixed z-40 p-6 overflow-y-auto transition-transform bg-white  dark:bg-gray-800",
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
