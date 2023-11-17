import { Routes } from "@/constants/routes.constants";
import { CompleteResume } from "@/types/resume.types";
import { useRouter } from "next/navigation";
import NewResumeCard from "./NewResumeCard";
import ResumeCard from "./ResumeCard";
import { useAppSelector } from "@/hooks/redux/useAppSelector";

type ResumeGridProps = {
  resumes: CompleteResume[];
};

export default function ResumeGrid(props: ResumeGridProps) {
  const { resumes } = props;
  const router = useRouter();
  const previewSettingEntities = useAppSelector(
    (state) => state.resume.previewSettings.entities
  );
  const handleResumeCardClicked = (resumeId: string) => {
    router.push(Routes.RESUME_WITH_ID(resumeId));
  };

  return (
    <>
      {resumes.length > 0 ? (
        <div className="grid xl:grid-cols-5 gap-8 xl:gap-12">
          <NewResumeCard />
          {resumes.map((resume) => {
            return (
              <ResumeCard
                resume={resume}
                previewSetting={previewSettingEntities[resume.id]}
                key={resume.id}
                onClick={() => handleResumeCardClicked(resume.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <NewResumeCard />
        </div>
      )}
    </>
  );
}
