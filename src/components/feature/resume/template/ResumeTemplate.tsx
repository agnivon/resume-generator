import {
  TemplateType,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";
import ResumeTemplateContextProvider from "@/context/ResumeTemplateContextProvider";
import { CompleteResume } from "@/types/resume.types";
import { getResumeTemplate } from "@/utils/template.utils";
import React from "react";

export type ResumeTemplateProps = {
  resume: CompleteResume;
  template?: TemplateType;
  paperSize?: TemplateSize;
  thumbnail?: boolean;
  thumbnailScale?: number;
  font?: TemplateFont;
  fontSize?: number;
  lineHeight?: number;
  accentColor?:string;
  showDivider?: boolean;
};

export default React.forwardRef(function Template(
  props: ResumeTemplateProps,
  ref: React.Ref<HTMLDivElement> | undefined
) {
  const { template = TemplateType.STANDARD } = props;

  const ResumeTemplateComponent = getResumeTemplate(template);

  return (
    <ResumeTemplateContextProvider value={props}>
      <ResumeTemplateComponent {...props} ref={ref} />
    </ResumeTemplateContextProvider>
  );
});
