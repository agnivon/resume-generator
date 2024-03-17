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
  const overLimit = (field.value?.length || 0) > limit;
  return (
    <div className={classNames("text-sm", overLimit ? "text-red-500" : "")}>{`${
      limit - (field.value?.length || 0)
    }/${limit} characters`}</div>
  );
}
