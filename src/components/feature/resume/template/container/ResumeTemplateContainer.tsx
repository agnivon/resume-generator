import { TemplateFont, TemplateSize } from "@/constants/template.constants";
import { classNames } from "@/utils";
import { getFontClass, getSizeClass } from "@/utils/template.utils";
import React from "react";
import { ResumeTemplateProps } from "../ResumeTemplate";
import useResponsiveScale from "@/hooks/resume/template/useResponsiveScale";

const ResumeTemplateContainer = React.forwardRef(
  (
    props: ResumeTemplateProps & { children: React.ReactNode },
    ref: React.Ref<HTMLDivElement> | undefined
  ) => {
    const {
      paperSize = TemplateSize.LETTER,
      font = TemplateFont.MERRIWEATHER,
      thumbnail,
      responsive,
      children,
    } = props;

    const scale = useResponsiveScale(
      props.scale,
      props.scale === 1 || props.scale === undefined
    );

    const sizeClass = getSizeClass(paperSize, thumbnail);

    const fontClass = getFontClass(font);

    const thumbnailClass = thumbnail
      ? "transform origin-top-left overflow-hidden shrink-0"
      : "";

    return (
      <div ref={ref} id={"resumePreview"}>
        <div
          className={classNames(
            "resume-template bg-white p-10 shadow-2xl flex flex-col text-gray-700 relative",
            sizeClass,
            fontClass,
            thumbnailClass
          )}
          style={{
            scale,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

ResumeTemplateContainer.displayName = "ResumeTemplateContainer";

export default ResumeTemplateContainer;
