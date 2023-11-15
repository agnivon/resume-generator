import resumeSlice from "@/redux/slices/resumeSlice";
import {
  Certification,
  Course,
  Education,
  Experience,
  Project,
  ResumeEntityArray,
  ResumeEntityArrayKeys,
  Skill,
} from "@/types/resume.types";

export const getUpsertActionForResumeEntities = <T extends ResumeEntityArray>(
  entity: ResumeEntityArrayKeys,
  data: T
) => {
  switch (entity) {
    case "experiences":
      return resumeSlice.actions.upsertManyExperiences(data as Experience[]);
    case "projects":
      return resumeSlice.actions.upsertManyProjects(data as Project[]);
    case "education":
      return resumeSlice.actions.upsertManyEducations(data as Education[]);
    case "certifications":
      return resumeSlice.actions.upsertManyCertifications(
        data as Certification[]
      );
    case "courses":
      return resumeSlice.actions.upsertManyCourses(data as Course[]);
    case "skills":
      return resumeSlice.actions.upsertManySkills(data as Skill[]);
    default:
      return resumeSlice.actions.upsertManyExperiences(data as Experience[]);
  }
};

export const getDeleteActionCreatorForResumeEntity = (
  entity: ResumeEntityArrayKeys
) => {
  switch (entity) {
    case "experiences":
      return resumeSlice.actions.deleteOneExperience;
    case "projects":
      return resumeSlice.actions.deleteOneProject;
    case "education":
      return resumeSlice.actions.deleteOneEducation;
    case "certifications":
      return resumeSlice.actions.deleteOneCertification;
    case "courses":
      return resumeSlice.actions.deleteOneCourse;
    case "skills":
      return resumeSlice.actions.deleteOneSkill;
    default:
      return resumeSlice.actions.deleteOneExperience;
  }
};
