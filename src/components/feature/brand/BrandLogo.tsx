import { Routes } from "@/constants/routes.constants";
import { classNames } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import RGLogoSvg from "../../../../public/images/resume-generator.png";

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
        src={RGLogoSvg}
        className="mr-3 w-auto h-auto"
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
