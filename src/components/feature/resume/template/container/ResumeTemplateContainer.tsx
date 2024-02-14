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
      responsive = false,
      selectableText = true,
      children,
    } = props;

    const scale = useResponsiveScale(props.scale, responsive);

    const sizeClass = getSizeClass(paperSize, thumbnail);

    const fontClass = getFontClass(font);

    const thumbnailClass = thumbnail
      ? "transform origin-top-left overflow-hidden shrink-0 p-10"
      : "";

    return (
      <div
        ref={ref}
        //id={"resumePreview"}
        className={classNames(
          "resume-template bg-white shadow-2xl text-gray-700",
          !thumbnail ? "p-10" : "",
          !selectableText ? "select-none" : ""
        )}
        style={{
          scale: !thumbnail ? scale : undefined,
        }}
      >
        <div
          className={classNames(
            "flex flex-col relative",
            sizeClass,
            fontClass,
            thumbnailClass
          )}
          style={{
            scale: thumbnail ? scale : undefined,
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
