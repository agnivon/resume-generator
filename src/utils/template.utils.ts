import BoldTemplate from "@/components/feature/resume/template/BoldTemplate";
import ModernTemplate from "@/components/feature/resume/template/ModernTemplate";
import StandardTemplate from "@/components/feature/resume/template/StandardTemplate";
import {
  START_END_DATE_FORMAT,
  START_END_DATE_TEMPLATE_FORMAT,
} from "@/constants/date.constants";
import {
  FONT_SIZE_MULTIPLIER,
  LINE_HEIGHT_MULTIPLIER,
  TemplateType,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";
import moment from "moment";

export const getResumeTemplate = (template: TemplateType) => {
  if (template == TemplateType.STANDARD) return StandardTemplate;
  if (template == TemplateType.BOLD) return BoldTemplate;
  if (template == TemplateType.MODERN) return ModernTemplate;
  return StandardTemplate;
};

export const getSizeClass = (size: TemplateSize, thumbnail?: boolean) => {
  if (size == TemplateSize.LETTER)
    return thumbnail ? "letter" : "letter-overflow";
  if (size == TemplateSize.A4) return thumbnail ? "a4" : "a4-overflow";
  if (size == TemplateSize.A6) return thumbnail ? "a6" : "a6-overflow";
  if (size == TemplateSize.A7) return thumbnail ? "a7" : "a7-overflow";
  if (size == TemplateSize.A8) return thumbnail ? "a8" : "a8-overflow";
  return "letter";
};

export const getFontClass = (font: TemplateFont) => {
  if (font == TemplateFont.MERRIWEATHER) return "font-merriweather";
  if (font == TemplateFont.SOURCE_SANS) return "font-source-sans";
  if (font == TemplateFont.DEJA_VU_SERIF) return "font-dejavu-serif";
  if (font == TemplateFont.ROBOTO_MONO) return "font-roboto-mono";
  if (font == TemplateFont.AR_ONE_SANS) return "font-ar-one-sans";
  return "font-merriweather";
};

export const getFontStyle = (
  fontSize: number = 1,
  lineHeight: number = 1,
  size: keyof (
    | typeof FONT_SIZE_MULTIPLIER
    | typeof LINE_HEIGHT_MULTIPLIER
  ) = "base",
  color?: string
) => {
  return {
    fontSize: `${fontSize * FONT_SIZE_MULTIPLIER[size]}rem`,
    lineHeight: `${lineHeight * LINE_HEIGHT_MULTIPLIER[size]}rem`,
    color,
  };
};

export const getStartEndDate = (start: string, end: string) => {
  const startDate = moment(start, START_END_DATE_FORMAT).format(
    START_END_DATE_TEMPLATE_FORMAT
  );
  const endDate = moment(end, START_END_DATE_FORMAT).format(
    START_END_DATE_TEMPLATE_FORMAT
  );
  return { startDate, endDate };
};
