import {
  ResumeTemplate,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";

export type AccentColor = { color: string; name: string };

export type ResumePreviewSettings = {
  template: ResumeTemplate;
  font: TemplateFont;
  paperSize: TemplateSize;
  fontSize: number;
  lineHeight: number;
  accentColor: string;
};
