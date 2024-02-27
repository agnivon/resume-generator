import { CompleteResume } from "@/types/resume.types";
import { ResumeV2 } from "@prisma/client";

export const SAMPLE_RESUME_1: ResumeV2 = {
  id: "",
  userId: "",
  name: "Padma Lahiri",
  createdAt: new Date(0),
  updatedAt: null,
  domain: "",
  experienceLevel: "",
  jobTitle: "",
  companyName: "",
  jobDescription: "",
  summary:
    "Experienced Software Developer with over 10 years of experience. Certified in Adobe development and well-versed in various programming languages, with a speciality in UI/UX design.",
  contact: {
    fullName: "Padma Lahiri",
    email: "padmalahiri@email.com",
    phone: "+91-93855-55592",
    linkedinUrl: "",
    personalUrl: "",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
  },
  experiences: [
    {
      role: "Software Developer",
      companyName: "XYZ Tech Solutions",
      startDate: "1st November 2022",
      endDate: "",
      companyLocation: "Bengaluru, Karnataka, India",
      description:
        "- Developed and maintained web applications using technologies like React, Node.js, and MongoDB.\n- Collaborated with cross-functional teams to design and implement new features, resulting in a 20% increase in user engagement.\n- Integrated AWS Lambda functions to automate data processing tasks, reducing processing time by 30%.",
      currentlyWorking: true,
      hidden: false,
      displayOrder: 0,
    },
    {
      role: "Lead Software Developer",
      companyName: "Archibald Tech Solutions",
      startDate: "1st November 2016",
      endDate: "31st October 2022",
      companyLocation: "Mumbai",
      description:
        "- Complete over 100 projects in the past seven years to ensure customer satisfaction\n- Scale up the company's e-commerce capabilities to allow customers to purchase accessories and schedule appointments online\n- Streamline the UX design for over 50 new applications\n- Recommend adjustments to our current algorithms to increase engagement online\n- Collaborate with Web Designers to create new ideas for applications and web services",
      currentlyWorking: false,
      hidden: false,
      displayOrder: 1,
    },
    {
      role: "Software Developer",
      companyName: "Anand Tech",
      startDate: "1st May 2011",
      endDate: "31st October 2016",
      companyLocation: "Mumbai",
      description:
        "- Monitored engagement and algorithms to track and improve customer engagement with our website\n- Programmed the new website to have improved UX functions\n- Troubleshoot errors that appear in existing programs",
      currentlyWorking: false,
      hidden: false,
      displayOrder: 2,
    },
  ],
  projects: [
    {
      title: "E-commerce Website",
      organization: "XYZ Tech Solutions",
      startDate: "1st June 2022",
      endDate: "September 2022",
      url: "",
      description:
        "- Built a full-stack e-commerce platform using MERN stack, integrating with PayPal API for secure payment processing.",
      currentlyWorking: true,
      hidden: false,
      displayOrder: 1,
    },
    {
      title: "Inventory Management System",
      organization: "XYZ Tech Solutions",
      startDate: "1st June 2021",
      endDate: "30th May 2022",
      url: "",
      description:
        "- Designed and implemented a Java-based inventory management system, improving tracking and reducing errors by 15%.",
      currentlyWorking: false,
      hidden: false,
      displayOrder: 2,
    },
  ],
  education: [
    {
      major: "Bachelor of Science in computer science",
      institution: "Valley Tech University",
      location: "Mumbai",
      year: "2011",
      minor: "",
      gpa: "",
      additionalInfo: "",

      hidden: false,
      displayOrder: 1,
    },
  ],
  certifications: [
    {
      name: "Adobe Certified Expert",
      institution: "Adobe",
      year: "2021",
      relevance: "",

      hidden: false,
      displayOrder: 0,
    },
    {
      name: "AWS Certified Developer – Associate",
      institution: "Amazon Web Services",
      year: "2021",
      relevance: "",

      hidden: false,
      displayOrder: 1,
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      institution: "Microsoft",
      year: "2020",
      relevance: "",

      hidden: false,
      displayOrder: 2,
    },
    {
      name: "CompTIA Security+ Certification",
      institution: "CompTIA",
      year: "2019",
      relevance: "",

      hidden: false,
      displayOrder: 4,
    },
  ],
  courses: [],
  skills: [
    {
      skill:
        "Adobe programs | UI and UX development | Web design | Attention to detail | Collaboration | Written and verbal communication",

      hidden: false,
      displayOrder: 1,
    },
  ],
  customSections: [],
  tags: [],
};
