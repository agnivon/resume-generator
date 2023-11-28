import {
  TemplateType,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";

export type AccentColor = { color: string; name: string };

export type ResumePreviewSettings = {
  template: TemplateType;
  font: TemplateFont;
  paperSize: TemplateSize;
  fontSize: number;
  lineHeight: number;
  accentColor: string;
};
