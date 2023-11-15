import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type SVGIconComponentType = (
  props: Omit<React.SVGProps<SVGSVGElement>, "ref">
) => React.ReactNode;

export type TypeKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type DeepOmit<T, K extends string> = {
  [P in keyof T]: P extends K
    ? never
    : T[P] extends object
    ? DeepOmit<T[P], K>
    : T[P];
};
