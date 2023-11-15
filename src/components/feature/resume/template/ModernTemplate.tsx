import { TemplateFont, TemplateSize } from "@/constants/template.constants";
import { useResumeTemplateContext } from "@/context/ResumeTemplateContextProvider";
import {
  Certification,
  Contact,
  Course,
  Education,
  Experience,
  Project,
  CompleteResume,
  Skill,
} from "@/types/resume.types";
import { classNames } from "@/utils";
import {
  getFontClass,
  getFontStyle,
  getSizeClass,
  getStartEndDate,
} from "@/utils/template.utils";
import moment from "moment";
import React from "react";
import {
  EnvelopeFill,
  GeoAltFill,
  Globe2,
  Linkedin,
  PhoneFill,
} from "react-bootstrap-icons";
import Markdown from "react-markdown";
import { ResumeTemplateProps } from "./ResumeTemplate";

const ContactInformation = ({ contact }: { contact: Contact | null }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();
  if (!contact) return <></>;
  return (
    <div className="w-fit min-w-[75%]">
      <div
        className="mb-1 font-semibold text-blue-500"
        style={getFontStyle(fontSize, lineHeight, "3xl")}
      >
        {contact.fullName}
      </div>
      <div
        className="flex gap-x-2 text-gray-500"
        style={getFontStyle(fontSize, lineHeight, "xs")}
      >
        {(contact.city || contact.state || contact.country) && (
          <span className="inline-flex gap-x-0.5 items-center">
            <GeoAltFill className="h-2.5 w-2.5" />
            <span>{`${contact.city}, ${contact.state}, ${contact.country}`}</span>
          </span>
        )}
        {contact.email && (
          <span className="inline-flex gap-x-0.5 items-center">
            <EnvelopeFill className="h-2.5 w-2.5" />{" "}
            <a href={`email:${contact.email}`}>{contact.email}</a>
          </span>
        )}
        {contact.phone && (
          <span className="inline-flex gap-x-0.5 items-center">
            <PhoneFill className="h-2.5 w-2.5" />
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </span>
        )}
        {contact.linkedinUrl && (
          <span className="inline-flex gap-x-0.5 items-center">
            <Linkedin className="h-2.5 w-2.5" />
            <a
              href={`https://linkedin.com/${contact.linkedinUrl}`}
              target="_blank"
            >
              {contact.linkedinUrl}
            </a>
          </span>
        )}
        {contact.personalUrl && (
          <span className="inline-flex gap-x-0.5 items-center">
            <Globe2 className="h-2.5 w-2.5" />
            <a href={contact.personalUrl} target="_blank">
              {contact.personalUrl}
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

const Summary = ({ summary }: { summary: CompleteResume["summary"] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {summary && (
        <div className="my-4">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            PROFESSIONAL SUMMARY
          </div>
          <div style={getFontStyle(fontSize, lineHeight, "sm")}>
            <p className="">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Experience = ({ experiences }: { experiences: Experience[] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {experiences.length > 0 && (
        <div className="my-2">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            PROFESSIONAL EXPERIENCE
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => {
              const { startDate, endDate } = getStartEndDate(
                exp.startDate,
                exp.endDate
              );
              return (
                <div
                  key={`${exp.role}-${exp.companyName}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold leading-none mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span className="text-blue-500">{exp.role}</span>
                    &nbsp;|&nbsp;{exp.companyName}
                  </div>
                  <div
                    className="font-semibold text-gray-500 leading-none mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {`${startDate} - ${
                      exp.currentlyWorking ? "Present" : endDate
                    }`}
                    ,&nbsp;{exp.companyLocation}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <Markdown>{exp.description}</Markdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Project = ({ projects }: { projects: Project[] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {projects.length > 0 && (
        <div className="my-2">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            PROJECTS
          </div>
          <div className="space-y-4">
            {projects.map((proj) => {
              const { startDate, endDate } = getStartEndDate(
                proj.startDate,
                proj.endDate
              );
              return (
                <div
                  key={`${proj.title}-${proj.organization}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span className="text-blue-500">{proj.title}</span>
                    &nbsp;|&nbsp;{proj.organization}
                  </div>
                  <div
                    className="font-semibold text-gray-500 mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {`${startDate} - 
                    ${proj.currentlyWorking ? "Present" : endDate}`}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <div className="">
                      <Markdown>{proj.description}</Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Education = ({ education }: { education: Education[] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {education.length > 0 && (
        <div className="my-2">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            EDUCATION
          </div>
          <div className="space-y-4">
            {education.map((edu) => {
              return (
                <div
                  key={`${edu.major}-${edu.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span className="text-blue-500">{edu.major}</span>
                    &nbsp;|&nbsp;{edu.institution}&nbsp;-&nbsp;{edu.location}
                  </div>
                  <div
                    className="font-semibold text-gray-500 mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {[
                      edu.minor ? `Minor in ${edu.minor}` : ``,
                      edu.year,
                      edu.gpa,
                    ]
                      .filter(Boolean)
                      .join(` , `)}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <div className="">
                      <Markdown>{edu.additionalInfo}</Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Certification = ({
  certifications,
}: {
  certifications: Certification[];
}) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {certifications.length > 0 && (
        <div className="my-2">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            CERTIFICATIONS
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => {
              return (
                <div
                  key={`${cert.name}-${cert.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span className="text-blue-500">{cert.name}</span>
                    &nbsp;|&nbsp;
                    {cert.institution}
                  </div>
                  <div
                    className="font-semibold text-gray-500 mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {cert.year}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <div className="">
                      <Markdown>{cert.relevance}</Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Course = ({ courses }: { courses: Course[] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {courses.length > 0 && (
        <div className="my-2">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Courses
          </div>
          <div className="space-y-4">
            {courses.map((course) => {
              return (
                <div
                  key={`${course.name}-${course.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span className="text-blue-500">{course.name}</span>
                    &nbsp;|&nbsp;
                    {course.institution}
                  </div>
                  <div
                    className="font-semibold text-gray-500 mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {[course.skills, course.year].filter(Boolean).join(" , ")}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <div className="">
                      <Markdown>{course.applications}</Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Skills = ({ skills }: { skills: Skill[] }) => {
  const { fontSize = 1, lineHeight = 1 } = useResumeTemplateContext();

  return (
    <div>
      {skills.length > 0 && (
        <div className="my-2 print-break-avoid">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            SKILLS
          </div>
          <div
            className="space-y-1"
            style={getFontStyle(fontSize, lineHeight, "sm")}
          >
            {skills.map((skill) => {
              return (
                <div key={`${skill.skill}`}>
                  <Markdown>{skill.skill}</Markdown>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ModernTemplate = React.forwardRef(
  (props: ResumeTemplateProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const {
      resume,
      pageSize = TemplateSize.LETTER,
      thumbnailScale = 0.233,
      font = TemplateFont.MERRIWEATHER,
      thumbnail,
    } = props;

    const sizeClass = getSizeClass(pageSize, thumbnail);

    const fontClass = getFontClass(font);

    const thumbnailClass = thumbnail
      ? "transform origin-top-left overflow-hidden shrink-0"
      : "";

    return (
      <div ref={ref}>
        <div
          className={classNames(
            "resume-template bg-white shadow-2xl p-10 flex flex-col text-gray-700",
            sizeClass,
            fontClass,
            thumbnailClass
          )}
          style={{
            scale: thumbnail ? thumbnailScale : undefined,
          }}
        >
          <ContactInformation contact={resume.contact} />
          <Summary summary={resume.summary} />
          <Experience experiences={resume.experiences} />
          <Project projects={resume.projects} />
          <Skills skills={resume.skills} />
          <Certification certifications={resume.certifications} />
          <Course courses={resume.courses} />
          <Education education={resume.education} />
        </div>
      </div>
    );
  }
);

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;
