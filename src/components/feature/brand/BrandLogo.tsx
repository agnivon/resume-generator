import { Routes } from "@/constants/routes.constants";
import { classNames } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  iconDimensions?: number | `${number}`;
  textClasses?: string;
  containerClasses?: string;
  hideText?: boolean;
};

export default function BrandLogo(props: BrandLogoProps) {
  const {
    iconDimensions = 28,
    textClasses = "text-lg",
    containerClasses,
    hideText = false,
  } = props;
  return (
    <Link
      href={Routes.RESUMES}
      className={classNames("flex items-center pl-1 mb-5", containerClasses)}
    >
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3"
        alt="Flowbite Logo"
        height={iconDimensions}
        width={iconDimensions}
      />
      {!hideText && (
        <span
          className={classNames(
            "self-center font-semibold whitespace-nowrap dark:text-white",
            textClasses
          )}
        >
          Resume Generator
        </span>
      )}
    </Link>
  );
}
