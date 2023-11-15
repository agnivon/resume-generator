import {
  ResumeTemplate,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";
import { CompleteResume } from "./resume.types";

export type ResumePreviewSettings = {
  template: ResumeTemplate;
  font: TemplateFont;
  paperSize: TemplateSize;
  fontSize: number;
  lineHeight: number;
};

export type ResumeFormValues = {
  resume: CompleteResume;
};
