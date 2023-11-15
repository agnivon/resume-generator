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

export const FORM_INVALID_MESSAGE = "Form contains invalid data. Please check and try again";
