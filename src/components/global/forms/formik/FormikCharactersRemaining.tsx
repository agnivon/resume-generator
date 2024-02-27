"use client";

import { classNames } from "@/utils";
import { useField } from "formik";

type FormikCharactersRemainingProps = {
  name: string;
  limit: number;
};

export default function FormikCharactersRemaining(
  props: FormikCharactersRemainingProps
) {
  const { name, limit } = props;
  const [field] = useField({ name });
  const overLimit = field.value.length > limit;
  return (
    <div
      className={classNames("text-sm", overLimit ? "text-red-500" : "")}
    >{`${limit - field.value.length}/${limit} characters`}</div>
  );
}
