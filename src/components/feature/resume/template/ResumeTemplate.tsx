import {
  TemplateFont,
  TemplateSize,
  TemplateType,
} from "@/constants/template.constants";
import ResumeTemplateContextProvider from "@/context/ResumeTemplateContextProvider";
import { getResumeTemplate } from "@/utils/template.utils";
import { ResumeV2 } from "@prisma/client";
import React from "react";

export type ResumeTemplateProps = {
  resume: ResumeV2;
  template?: TemplateType;
  paperSize?: TemplateSize;
  thumbnail?: boolean;
  scale?: number;
  font?: TemplateFont;
  fontSize?: number;
  lineHeight?: number;
  accentColor?: string;
  responsive?: boolean;
  selectableText?: boolean;
  showDivider?: boolean;
};

export default React.memo(
  React.forwardRef(function Template(
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
  })
);
