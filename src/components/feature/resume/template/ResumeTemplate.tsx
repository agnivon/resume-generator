import {
  ResumeTemplate,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";
import ResumeTemplateContextProvider from "@/context/ResumeTemplateContextProvider";
import { CompleteResume } from "@/types/resume.types";
import { getResumeTemplate } from "@/utils/template.utils";
import React from "react";

export type ResumeTemplateProps = {
  resume: CompleteResume;
  template?: ResumeTemplate;
  pageSize?: TemplateSize;
  thumbnail?: boolean;
  thumbnailScale?: number;
  font?: TemplateFont;
  fontSize?: number;
  lineHeight?: number;
  showDivider?: boolean;
};

export default React.forwardRef(function Template(
  props: ResumeTemplateProps,
  ref: React.Ref<HTMLDivElement> | undefined
) {
  const { template = ResumeTemplate.STANDARD } = props;

  const ResumeTemplateComponent = getResumeTemplate(template);

  return (
    <ResumeTemplateContextProvider value={props}>
      <ResumeTemplateComponent {...props} ref={ref} />
    </ResumeTemplateContextProvider>
  );
});
