import { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: "Resume Generator",
  description:
    "Unlock your career potential with Resume Generator. Employ expert, field-tested resume templates that adhere to the precise 'resume rules' that companies require. Try it today for free—it's simple to use and takes only a few minutes!",
  keywords: [
    "Resume builder",
    "Resume maker",
    "CV builder",
    "CV maker",
    "Online resume maker",
    "Resume creator",
    "Create resumes online",
    "Free resume generator",
  ],
  authors: [
    {
      name: "Agnivo Neogi",
      url: "https://www.agnivon.com",
    },
  ],
  creator: "Agnivo Neogi",
  openGraph: {
    title: "Resume Generator",
    description: "Generate resumes online",
    url: "https://rg.agnivon.com",
    siteName: "Resume Generator",
    images: [
      {
        alt: "Resume Generator",
        height: 3000,
        width: 3000,
        url: "https://rg.agnivon.com/images/resume-generator.png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Generator",
    description: "Generate resumes online",
    images: [
      {
        alt: "Resume Generator",
        height: 3000,
        width: 3000,
        url: "https://rg.agnivon.com/images/resume-generator.png",
      },
    ],
    creator: "Agnivo Neogi",
  },
  icons: {
    icon: "https://rg.agnivon.com/favicon.ico",
    shortcut: "https://rg.agnivon.com/favicon.ico",
  },
};
