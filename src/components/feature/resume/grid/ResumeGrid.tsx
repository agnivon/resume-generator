import { Routes } from "@/constants/routes.constants";
import { CompleteResume } from "@/types/resume.types";
import { useRouter } from "next/navigation";
import NewResumeCard from "./NewResumeCard";
import ResumeCard from "./ResumeCard";

type ResumeGridProps = {
  resumes: CompleteResume[];
};

export default function ResumeGrid(props: ResumeGridProps) {
  const { resumes } = props;
  const router = useRouter();
  const handleResumeCardClicked = (resumeId: string) => {
    router.push(Routes.RESUME_WITH_ID(resumeId));
  };

  return (
    <>
      <div className="grid xl:grid-cols-4 2xl:grid-cols-5 gap-8 xl:gap-12">
        <NewResumeCard />
        {resumes.map((resume) => {
          return (
            <ResumeCard
              resume={resume}
              key={resume.id}
              onClick={() => handleResumeCardClicked(resume.id)}
            />
          );
        })}
      </div>
    </>
  );
}
