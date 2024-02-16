"use client";

import { classNames } from "@/utils";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import Button, { ButtonProps, ButtonSize } from "./Button";
import MotionDiv from "./motion/MotionDiv";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type DropdownItemValue = string | number | null;

export type DropdownItem = {
  key?: string | number;
  value: DropdownItemValue;
  disabled?: boolean;
};

type DropdownProps<T extends DropdownItem> = {
  value: DropdownItemValue;
  items: T[];
  disabled?: boolean;
  dropdownHeader?: React.ReactNode;
  onChange?: (value: DropdownItemValue) => void;
  selectedValueRenderer?: (item: T | undefined) => React.ReactNode;
  contentRenderer?: (item: T) => React.ReactNode;
  ButtonComponent?: (props: ButtonProps) => React.JSX.Element;
  dropdownButtonProps?: ButtonProps;
  customMenuClassNames?: string;
  customMenuButtonClassNames?: string;
  customUlClassNames?: string;
  showDownArrow?: boolean;
};

/* const DownArrow = () => (
  <svg
    className="w-2.5 h-2.5 ml-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 4 4 4-4"
    />
  </svg>
); */

export default function Dropdown<T extends DropdownItem>(
  props: DropdownProps<T>
) {
  const {
    value,
    items,
    disabled = false,
    dropdownHeader,
    onChange = () => undefined,
    ButtonComponent = Button,
    dropdownButtonProps,
    customMenuClassNames,
    customMenuButtonClassNames,
    customUlClassNames,
    showDownArrow = true,
  } = props;

  const [show, setShow] = React.useState<boolean>(false);
  const [positionClass, setPositionClass] = React.useState<string>("top-2");
  const dropdownRef = React.useRef<HTMLDivElement | null>();
  const dropdownOutsideClickRef = useDetectClickOutside({
    onTriggered: () => setShow(false),
  });

  React.useLayoutEffect(() => {
    if (show && dropdownRef.current) {
      const { bottom } = dropdownRef.current.getBoundingClientRect();
      if (bottom > window.innerHeight) setPositionClass("bottom-8");
    } else {
      setPositionClass("top-2");
    }
  }, [show]);

  const selectedItem = items.find((item) => item.value === value);
  const {
    selectedValueRenderer = () => selectedItem?.key || "Select",
    contentRenderer = (item) => item.key as React.ReactNode,
  } = props;
  return (
    <div>
      <ButtonComponent
        type="button"
        label={
          <div className="flex justify-between w-full">
            {selectedValueRenderer(selectedItem)}
            {showDownArrow && (
              <ChevronDownIcon
                className={classNames(
                  "w-5 h-5 ml-2.5 transition-all",
                  show ? "rotate-180" : ""
                )}
              />
            )}
          </div>
        }
        onClick={() => setShow((show) => !show)}
        size={ButtonSize.SMALL}
        {...dropdownButtonProps}
      />
      <AnimatePresence>
        {show && (
          <div className="relative w-full">
            <MotionDiv
              className={classNames(
                "absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700",
                positionClass,
                customMenuClassNames
              )}
              transition={{ duration: 0.1 }}
            >
              <div
                ref={(ref) => {
                  dropdownRef.current = ref;
                  dropdownOutsideClickRef.current = ref as null;
                }}
              >
                {dropdownHeader && (
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {dropdownHeader}
                  </div>
                )}
                <ul
                  className={classNames(
                    "py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto",
                    customUlClassNames
                  )}
                >
                  {items.map((item) => {
                    const { key, value } = item;
                    return (
                      <li key={key} className="cursor-pointer">
                        <button
                          className={classNames(
                            "w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white disabled:text-gray-400 dark:disabled:text-gray-500",
                            customMenuButtonClassNames
                          )}
                          onClick={() => {
                            onChange(value);
                            setShow(false);
                          }}
                          disabled={disabled || item.disabled}
                        >
                          {contentRenderer(item)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
