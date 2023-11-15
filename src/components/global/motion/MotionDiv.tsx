"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import { HTMLAttributes } from "react";

export type MotionDivProps = HTMLMotionProps<"div"> &
  HTMLAttributes<HTMLDivElement>;

const MotionDiv = (props: MotionDivProps) => {
  const { children, ...rest } = props;
  return (
    <motion.div
      //layout
      //variants={Variant.FADE}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
