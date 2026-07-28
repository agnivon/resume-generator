export function classNames(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export * from "./url.utils";

