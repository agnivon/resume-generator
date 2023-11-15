import Image from "next/image";

export default function BrandLogo() {
  return (
    <a href="https://flowbite.com/" className="flex items-center pl-2.5 mb-5">
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3"
        alt="Flowbite Logo"
        height={"28"}
        width={"28"}
      />
      <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
        Resume Generator
      </span>
    </a>
  );
}
