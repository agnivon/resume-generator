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

export const SAMPLE_JOB_DESCRIPTION = {
  company: {
    name: "Quantum Innovation Tech",
  },
  job: {
    title: "Artificial Intelligence Engineer",
    description:
      "Are you ready to revolutionize the future of technology? Quantum Innovations Tech is seeking a highly skilled and motivated Senior Artificial Intelligence Engineer to join our dynamic team. As a key member of our R&D department, you will play a crucial role in developing cutting-edge AI solutions that push the boundaries of innovation.",
    responsibilities: [
      "Design and implement advanced machine learning algorithms and models.",
      "Collaborate with cross-functional teams to integrate AI technologies into existing products.",
      "Conduct in-depth research to stay abreast of the latest developments in artificial intelligence.",
      "Lead and mentor a team of talented engineers, fostering a culture of continuous learning and innovation.",
      "Work closely with product managers to understand and define project requirements.",
    ],
    qualifications: [
      "Ph.D. or Master's degree in Computer Science, Artificial Intelligence, or related field.",
      "Proven experience in developing and deploying machine learning models in real-world applications.",
      "Proficient in programming languages such as Python, TensorFlow, and PyTorch.",
      "Strong understanding of deep learning, natural language processing, and computer vision.",
      "Excellent problem-solving and communication skills.",
    ],
    perks_and_benefits: [
      "Competitive salary and performance-based bonuses.",
      "Comprehensive health and wellness programs.",
      "Opportunities for professional development and continued education.",
      "Collaborative and innovative work environment.",
      "Flexible work hours and remote work options.",
    ],
  },
};
