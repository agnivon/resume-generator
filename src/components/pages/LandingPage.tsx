"use client";

import { Routes } from "@/constants/routes.constants";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  CogIcon,
  DocumentArrowDownIcon,
  DocumentDuplicateIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import BrandLogo from "../feature/brand/BrandLogo";

/* const heroSectionResumeAnimationProps = {
  initial: {
    opacity: 0.4,
    translateX: "24rem",
    scale: 1,
  },
  animate: { opacity: 1, translateX: "0rem", scale: 1 },
  //exit: { opacity: 0.4 },
  transition: { ease: "easeInOut", duration: 1 },
};
 */
const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 lg:grid-cols-12 lg:py-16 place-items-center overflow-x-clip">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Generate your resume in minutes
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {`Fill out the sections, choose your template and preferred
            settings, and you're good to go.`}
          </p>
          <Link
            href={Routes.RESUMES}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:flex -space-x-96 lg:col-span-5 rounded-lg overflow-hidden scale-90 shadow-lg dark:shadow-sm-light">
          <img
            src="/images/sample_resume_1.jpg"
            alt="mockup"
            className="shadow-lg"
          />
          <img
            src="/images/sample_resume_3.jpg"
            alt="mockup"
            className="shadow-lg"
          />
          <img
            src="/images/sample_resume_2.jpg"
            alt="mockup"
            className="shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({
  icon,
  heading,
  content,
}: {
  icon: React.ReactNode;
  heading: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">{heading}</h3>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Unlock your career potential with Resume Generator
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            {`Employ expert, field-tested resume templates that adhere to the
            precise "resume rules" that companies require. Try it today for
            free—it's simple to use and takes only a few minutes!`}
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <FeatureItem
            icon={
              <GlobeAltIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Simple online resume generator"}
            content={
              "Create an outstanding resume in minutes, without leaving your online browser"
            }
          />
          <FeatureItem
            icon={
              <LockClosedIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Your information is secure"}
            content={
              "Robust 256-bit encryption safeguards and maintains the privacy of your information."
            }
          />
          <FeatureItem
            icon={
              <CogIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Automated summary generator"}
            content={
              "Create a great resume summary with one click. Blocking out on writing is no longer a barrier."
            }
          />
          <FeatureItem
            icon={
              <DocumentDuplicateIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Professional Templates"}
            content={
              "Professionally-designed resume templates and examples. Just edit and download in a matter of minutes"
            }
          />
          <FeatureItem
            icon={
              <CodeBracketIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Optimized formats"}
            content={
              "The designs and formats are optimized to comply with parsers and resume-filtering algorithms. Ensure that your application reaches humans!"
            }
          />
          <FeatureItem
            icon={
              <DocumentArrowDownIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
            }
            heading={"Save as PDF"}
            content={"Print your resume to a PDF file with a single click"}
          />
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full bg-gray-50 dark:bg-gray-800">
        <div className="ml-3 mt-[1.1rem] ">
          <BrandLogo />
        </div>
      </div>
      <HeroSection />
      <FeatureSection />
    </div>
  );
}
