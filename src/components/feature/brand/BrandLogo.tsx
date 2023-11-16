import { Routes } from "@/constants/routes.constants";
import { classNames } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  iconDimensions?: number | `${number}`;
  textClasses?: string;
};

export default function BrandLogo(props: BrandLogoProps) {
  const { iconDimensions = 28, textClasses = "text-lg" } = props;
  return (
    <Link href={Routes.HOME} className="flex items-center pl-2.5 mb-5">
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3"
        alt="Flowbite Logo"
        height={iconDimensions}
        width={iconDimensions}
      />
      <span
        className={classNames(
          "self-center font-semibold whitespace-nowrap dark:text-white",
          textClasses
        )}
      >
        Resume Generator
      </span>
    </Link>
  );
}
