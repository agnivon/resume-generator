import { Routes } from "@/constants/routes.constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ResumeV2 } from "@prisma/client";
import { useRouter } from "next/navigation";
import NewResumeCard from "./NewResumeCard";
import ResumeCard from "./ResumeCard";

type ResumeGridProps = {
  resumes: ResumeV2[];
};

export default function ResumeGrid(props: ResumeGridProps) {
  const { resumes } = props;
  const router = useRouter();
  const previewSettingEntities = useAppSelector(
    (state) => state.resume.previewSettings.entities
  );
  const handleResumeCardClicked = (resumeId: string) => {
    router.push(Routes.GET_RESUME_WITH_ID(resumeId));
  };

  return (
    <>
      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
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
