import { ResumePreviewSettings } from "@/types/form.types";

export enum ResumeTemplate {
  STANDARD = "Standard",
  BOLD = "Bold",
  MODERN = "Modern",
}

export enum TemplateSize {
  LETTER = "letter",
  A4 = "a4",
  A6 = "a6",
  A7 = "a7",
  A8 = "a8",
  A9 = "a9",
}

export enum TemplateFont {
  MERRIWEATHER = "merriweather",
  SOURCE_SANS = "source-sans",
  DEJA_VU_SERIF = "deja-vu-serif",
  ROBOTO_MONO = "roboto-mono",
  AR_ONE_SANS = "ar-one-sans",
}

export const INITIAL_PREVIEW_SETTINGS = (): ResumePreviewSettings => ({
  template: ResumeTemplate.STANDARD,
  font: TemplateFont.MERRIWEATHER,
  paperSize: TemplateSize.LETTER,
  fontSize: 0.9,
  lineHeight: 1,
});

export const FONT_SIZE_MULTIPLIER = {
  xs: 0.75,
  sm: 0.875,
  base: 1,
  lg: 1.125,
  xl: 1.25,
  "2xl": 1.5,
  "3xl": 1.875,
} as const;

export const LINE_HEIGHT_MULTIPLIER = {
  xs: 1,
  sm: 1.25,
  base: 1.5,
  lg: 1.75,
  xl: 1.75,
  "2xl": 2,
  "3xl": 2.25,
} as const;
