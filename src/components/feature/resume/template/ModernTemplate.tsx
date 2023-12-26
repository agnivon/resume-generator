import { useResumeTemplateContext } from "@/context/ResumeTemplateContextProvider";
import type {
  Certification,
  CompleteResume,
  Contact,
  Course,
  Education,
  Experience,
  Project,
  Skill,
} from "@/types/resume.types";
import {
  getFontStyle,
  getStartEndDate
} from "@/utils/template.utils";
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
import ResumeTemplateContainer from "./container/ResumeTemplateContainer";

const ContactInformation = ({ contact }: { contact: Contact | null }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    accentColor,
  } = useResumeTemplateContext();
  if (!contact) return <></>;
  return (
    <div className="w-fit min-w-[75%]">
      <div
        className="mb-1 font-semibold"
        style={getFontStyle(fontSize, lineHeight, "3xl", accentColor)}
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
  const { fontSize, lineHeight } = useResumeTemplateContext();

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
  const { fontSize, lineHeight, accentColor } = useResumeTemplateContext();

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
                    <span className="" style={{ color: accentColor }}>
                      {exp.role}
                    </span>
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
  const { fontSize, lineHeight, accentColor } = useResumeTemplateContext();

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
                    <span className="" style={{ color: accentColor }}>
                      {proj.title}
                    </span>
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
  const { fontSize, lineHeight, accentColor } = useResumeTemplateContext();

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
                    <span className="" style={{ color: accentColor }}>
                      {edu.major}
                    </span>
                    &nbsp;|&nbsp;{edu.institution}&nbsp;-&nbsp;{edu.location}
                  </div>
                  <div
                    className="font-semibold text-gray-500 mt-1"
                    style={getFontStyle(fontSize, lineHeight, "xs")}
                  >
                    {[
                      edu.minor ? `Minor in ${edu.minor}` : ``,
                      edu.year,
                      edu.gpa ? `${edu.gpa} GPA` : ``,
                    ]
                      .filter(Boolean)
                      .join(`, `)}
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
  const { fontSize, lineHeight, accentColor } = useResumeTemplateContext();

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
                    <span className="" style={{ color: accentColor }}>
                      {cert.name}
                    </span>
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
  const { fontSize = 1, lineHeight, accentColor } = useResumeTemplateContext();

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
                    <span className="" style={{ color: accentColor }}>
                      {course.name}
                    </span>
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
  const { fontSize, lineHeight } = useResumeTemplateContext();

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
    const { resume } = props;

    return (
      <ResumeTemplateContainer {...props} ref={ref}>
        <ContactInformation contact={resume.contact} />
        <Summary summary={resume.summary} />
        <Experience experiences={resume.experiences} />
        <Project projects={resume.projects} />
        <Skills skills={resume.skills} />
        <Certification certifications={resume.certifications} />
        <Course courses={resume.courses} />
        <Education education={resume.education} />
      </ResumeTemplateContainer>
    );
  }
);

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;
