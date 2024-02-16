import MotionDiv from "@/components/global/motion/MotionDiv";
import { AnimatePresence } from "framer-motion";
import { useDeferredValue } from "react";

export default function TagNameError({
  isDuplicateName,
  isInvalidLengthName,
}: {
  isDuplicateName: boolean;
  isInvalidLengthName: boolean;
}) {
  const isDuplicateNameDeferred = useDeferredValue(isDuplicateName);
  const isInvalidLengthNameDeferred = useDeferredValue(isInvalidLengthName);
  const isError = isDuplicateNameDeferred || isInvalidLengthNameDeferred;
  return (
    <AnimatePresence>
      {isError && (
        <MotionDiv className="absolute bottom-8 text-xs px-2 py-1 rounded-lg text-red-500 bg-gray-100 dark:bg-gray-800 shadow dark:shadow-sm-light border dark:border-gray-600">
          {isDuplicateNameDeferred
            ? `Tag with that name already exists`
            : isInvalidLengthNameDeferred
            ? `Tag name cannot exceed 25 characters`
            : ""}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
