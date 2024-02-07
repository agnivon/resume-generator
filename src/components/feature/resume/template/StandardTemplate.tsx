import { useResumeTemplateContext } from "@/context/ResumeTemplateContextProvider";
import { filterHidden, getFontStyle, getStartEndDate } from "@/utils/template.utils";
import React from "react";
import {
  EnvelopeFill,
  Globe2,
  Linkedin,
  PhoneFill,
} from "react-bootstrap-icons";
import Markdown from "react-markdown";
import { ResumeTemplateProps } from "./ResumeTemplate";
import ResumeTemplateContainer from "./container/ResumeTemplateContainer";
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

const Divider = () => <hr className="my-2" />;

const ContactInformation = ({ contact }: { contact: ContactV2 | null }) => {
  const { fontSize, lineHeight, accentColor } = useResumeTemplateContext();
  if (!contact) return <></>;
  return (
    <div>
      <div
        className="text-center mb-1 font-bold"
        style={getFontStyle(fontSize, lineHeight, "3xl", accentColor)}
      >
        {contact.fullName}
      </div>
      <div
        className="flex justify-center gap-x-2"
        style={getFontStyle(fontSize, lineHeight, "xs")}
      >
        {(contact.city || contact.state || contact.country) && (
          <span>{`${contact.city}, ${contact.state}, ${contact.country}`}</span>
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
      <Divider />
    </div>
  );
};

const Summary = ({ summary }: { summary: ResumeV2["summary"] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {summary && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            SUMMARY
          </div>
          <hr className="border-t-2 border-gray-700" />
          <div
            className="my-1"
            style={getFontStyle(fontSize, lineHeight, "sm")}
          >
            <p className="">{summary}</p>
          </div>
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Experience = ({ experiences }: { experiences: ExperienceV2[] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {experiences.length > 0 && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            EXPERIENCE
          </div>
          <hr className="border-t-2 border-gray-700" />
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
                    style={getFontStyle(fontSize, lineHeight, "base")}
                  >
                    {exp.role}
                  </div>
                  <div
                    className="font-medium flex justify-between"
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    <span>{exp.companyName}</span>
                    <span>{`${startDate} - ${
                      exp.currentlyWorking ? "Present" : endDate
                    }, ${exp.companyLocation}`}</span>
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
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Project = ({ projects }: { projects: ProjectV2[] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {projects.length > 0 && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            PROJECTS
          </div>
          <hr className="border-t-2 border-gray-700" />
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
                    style={getFontStyle(fontSize, lineHeight, "base")}
                  >
                    {proj.title}
                  </div>
                  <div
                    className=""
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {proj.organization}&nbsp;&bull;&nbsp;
                    {startDate}&nbsp;-&nbsp;
                    {proj.currentlyWorking ? "Present" : endDate}
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
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Education = ({ education }: { education: EducationV2[] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {education.length > 0 && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Education
          </div>
          <hr className="border-t-2 border-gray-700" />
          <div className="space-y-4">
            {education.map((edu) => {
              return (
                <div
                  key={`${edu.major}-${edu.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "base")}
                  >
                    {edu.major}
                  </div>
                  <div
                    className=""
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {[
                      edu.minor ? `Minor in ${edu.minor}` : ``,
                      edu.institution,
                      edu.location,
                      edu.year,
                      edu.gpa,
                    ]
                      .filter(Boolean)
                      .join(` • `)}
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
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Certification = ({
  certifications,
}: {
  certifications: CertificationV2[];
}) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {certifications.length > 0 && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Certifications
          </div>
          <hr className="border-t-2 border-gray-700" />
          <div className="space-y-4">
            {certifications.map((cert) => {
              return (
                <div
                  key={`${cert.name}-${cert.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "base")}
                  >
                    {cert.name}
                  </div>
                  <div
                    className=""
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {cert.institution}&nbsp;&bull;&nbsp;
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
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Course = ({ courses }: { courses: CourseV2[] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {courses.length > 0 && (
        <>
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Courses
          </div>
          <hr className="border-t-2 border-gray-700" />
          <div className="space-y-4">
            {courses.map((course) => {
              return (
                <div
                  key={`${course.name}-${course.institution}`}
                  className="print-break-avoid"
                >
                  <div
                    className="font-semibold mt-1"
                    style={getFontStyle(fontSize, lineHeight, "base")}
                  >
                    {course.name}
                  </div>
                  <div
                    className=""
                    style={getFontStyle(fontSize, lineHeight, "sm")}
                  >
                    {course.institution}&nbsp;&bull;&nbsp;
                    {course.year}&nbsp;&bull;&nbsp;
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
          {showDivider && <Divider />}
        </>
      )}
    </div>
  );
};

const Skills = ({ skills }: { skills: SkillV2[] }) => {
  const {
    fontSize = 1,
    lineHeight = 1,
    showDivider = true,
  } = useResumeTemplateContext();

  return (
    <div>
      {skills.length > 0 && (
        <div className="print-break-avoid">
          <div
            className="font-semibold"
            style={getFontStyle(fontSize, lineHeight, "lg")}
          >
            Skills
          </div>
          <hr className="border border-black mb-2" />
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
          {showDivider && <Divider />}
        </div>
      )}
    </div>
  );
};

const StandardTemplate = React.forwardRef(
  (props: ResumeTemplateProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const { resume } = props;

    return (
      <ResumeTemplateContainer {...props} ref={ref}>
        {/* <div className="absolute w-full border border-dashed border-gray-300 top-[28cm] left-0 right-0"></div> */}
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

StandardTemplate.displayName = "StandardTemplate";

export default StandardTemplate;
