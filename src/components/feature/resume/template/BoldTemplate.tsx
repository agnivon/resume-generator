import { useResumeTemplateContext } from "@/context/ResumeTemplateContextProvider";
import type {
  Certification,
  Course,
  Education,
  Experience,
  Project,
} from "@/types/resume.types";
import {
  filterHidden,
  getFontStyle,
  getStartEndDate,
} from "@/utils/template.utils";
import {
  CertificationV2,
  ContactV2,
  CourseV2,
  EducationV2,
  ExperienceV2,
  ProjectV2,
  ResumeV2,
  SkillV2,
} from "@prisma/client";
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

const ContactInformation = ({ contact }: { contact: ContactV2 | null }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();
  if (!contact) return <></>;
  const location = [contact.city, contact.state, contact.country].filter(
    Boolean
  );
  return (
    <div className="w-fit min-w-[75%]">
      <div
        className="mb-1 font-bold"
        style={getFontStyle(fontSize, lineHeight, "3xl")}
      >
        {contact.fullName}
      </div>
      <hr className="border-2 my-4 border-gray-200 w-full" />
      <div
        className="flex gap-2 items-center flex-wrap"
        style={getFontStyle(fontSize, lineHeight, "xs")}
      >
        {location.length > 0 && (
          <span className="inline-flex gap-x-0.5 items-center">
            <GeoAltFill className="h-2.5 w-2.5" />
            <span>{location.join(", ")}</span>
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

const Summary = ({ summary }: { summary: ResumeV2["summary"] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {summary && (
        <div className="my-4">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Professional Summary
          </div>
          <div style={getFontStyle(fontSize, lineHeight, "sm")}>
            <p className="">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Experience = ({ experiences }: { experiences: ExperienceV2[] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {experiences.length > 0 && (
        <div className="my-2">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Professional Experience
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
                  /*className="print-break-avoid"*/
                >
                  <div
                    className="font-bold leading-none mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {exp.role}&nbsp;|&nbsp;{exp.companyName}&nbsp;|&nbsp;
                    {exp.companyLocation}&nbsp;|&nbsp;
                    {`${startDate} - ${
                      exp.currentlyWorking ? "Present" : endDate
                    }`}
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

const Project = ({ projects }: { projects: ProjectV2[] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {projects.length > 0 && (
        <div className="my-2">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Projects
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
                  /*className="print-break-avoid"*/
                >
                  <div
                    className="font-bold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {proj.title}&nbsp;|&nbsp;{proj.organization}&nbsp;|&nbsp;
                    {startDate}&nbsp;-&nbsp;
                    {proj.currentlyWorking ? "Present" : endDate}
                  </div>
                  <div
                    className="my-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <div className="rt-markdown">
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

const Education = ({ education }: { education: EducationV2[] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {education.length > 0 && (
        <div className="my-2">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Education
          </div>
          <div className="space-y-4">
            {education.map((edu) => {
              return (
                <div
                  key={`${edu.major}-${edu.institution}`}
                  /*className="print-break-avoid"*/
                >
                  <div
                    className="font-bold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {[
                      edu.major,
                      edu.minor,
                      edu.institution,
                      edu.location,
                      edu.year,
                      edu.gpa,
                    ]
                      .filter(Boolean)
                      .join(` | `)}
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
  certifications: CertificationV2[];
}) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {certifications.length > 0 && (
        <div className="my-2">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Certifications
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => {
              return (
                <div
                  key={`${cert.name}-${cert.institution}`}
                  /*className="print-break-avoid"*/
                >
                  <div
                    className="font-bold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {cert.name}&nbsp;|&nbsp;
                    {cert.institution}&nbsp;|&nbsp;
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

const Course = ({ courses }: { courses: CourseV2[] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {courses.length > 0 && (
        <div className="my-2">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Courses
          </div>
          <div className="space-y-4">
            {courses.map((course) => {
              return (
                <div
                  key={`${course.name}-${course.institution}`}
                  /*className="print-break-avoid"*/
                >
                  <div
                    className="font-bold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {course.name}&nbsp;|&nbsp;
                    {course.institution}&nbsp;|&nbsp;
                    {course.year}&nbsp;|&nbsp;
                    {course.skills}
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

const Skills = ({ skills }: { skills: SkillV2[] }) => {
  const { fontSize, lineHeight } = useResumeTemplateContext();

  return (
    <div>
      {skills.length > 0 && (
        <div className="my-2 print-break-avoid">
          <div
            className="font-bold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Skills
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

const BoldTemplate = React.forwardRef(
  (props: ResumeTemplateProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const { resume, accentColor = "#000000" } = props;

    return (
      <ResumeTemplateContainer {...props} ref={ref}>
        <div
          className="h-2 w-full mb-3"
          style={{ backgroundColor: accentColor }}
        >
          &nbsp;
        </div>
        <ContactInformation contact={resume.contact} />
        <Summary summary={resume.summary} />
        <Experience experiences={filterHidden(resume.experiences)} />
        <Project projects={filterHidden(resume.projects)} />
        <Skills skills={filterHidden(resume.skills)} />
        <Certification certifications={filterHidden(resume.certifications)} />
        <Course courses={filterHidden(resume.courses)} />
        <Education education={filterHidden(resume.education)} />
      </ResumeTemplateContainer>
    );
  }
);

BoldTemplate.displayName = "BoldTemplate";

export default BoldTemplate;
