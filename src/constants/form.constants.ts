import { TemplateFont, TemplateSize } from "./template.constants";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTHS_DROPDOWN_OPTIONS = MONTHS.map((month) => ({
  key: month,
  value: month,
}));

const YEARS = Array.from(
  Array(new Date().getFullYear() - 1970 + 1),
  (_, index) => new Date().getFullYear() - index
);

export const YEARS_DROPDOWN_OPTIONS = YEARS.map((year) => ({
  key: `${year}`,
  value: `${year}`,
}));

export const FORM_INVALID_MESSAGE =
  "Form contains invalid data. Please check and try again";

export const FONT_SELECT_OPTIONS = [
  { key: "Merriweather", value: TemplateFont.MERRIWEATHER },
  { key: "Source Sans 3", value: TemplateFont.SOURCE_SANS },
  { key: "Deja Vu Serif", value: TemplateFont.DEJA_VU_SERIF },
  { key: "Roboto Mono", value: TemplateFont.ROBOTO_MONO },
  { key: "AR One Sans", value: TemplateFont.AR_ONE_SANS },
];

export const PAPER_SIZE_DROPDOWN_OPTIONS = [
  { key: "Letter", value: TemplateSize.LETTER },
  { key: "A4", value: TemplateSize.A4 },
];
