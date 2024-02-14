import { ResumesPageFilter } from "@/types/state.types";
import { ResumeV2 } from "@prisma/client";

function intersection(set1: any[], set2: Set<any>) {
  return Array.from(set1).filter((element) => set2.has(element));
}

export default function useFilterResumePageV2(
  resumes: ResumeV2[],
  filter: ResumesPageFilter
) {
  const selectedTagsSet = new Set(filter.tags);
  return resumes.filter((resume) => {
    if (filter.tags.length === 0) return true;
    return intersection(resume.tags, selectedTagsSet).length > 0;
  });
}
