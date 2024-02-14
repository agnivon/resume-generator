import { Routes } from "@/constants/routes.constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ResumeV2 } from "@prisma/client";
import { useRouter } from "next/navigation";
import NewResumeButton from "./NewResumeButton";
import NewResumeCard from "./NewResumeCard";
import ResumeGridCard from "./ResumeGridCard";
import ResumeGridToolbar from "./ResumeGridToolbar";
import useFilterResumePageV2 from "@/hooks/resume/filter/useFilterResumePageV2";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";

type ResumeGridProps = {
  resumes: ResumeV2[];
};

export default function ResumeGrid(props: ResumeGridProps) {
  const { state } = useResumesPageContext();
  const { resumes } = props;
  const router = useRouter();
  const previewSettingEntities = useAppSelector(
    (state) => state.resume.previewSettings.entities
  );

  const filteredResumes = useFilterResumePageV2(resumes, state.filter);

  const handleResumeCardClicked = (resumeId: string) => {
    router.push(Routes.GET_RESUME_WITH_ID(resumeId));
  };

  return (
    <>
      {resumes.length > 0 ? (
        <div>
          <ResumeGridToolbar />
          <div className="grid grid-cols-1 max-sm:place-items-center place-items-start md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            {/* <NewResumeCard /> */}
            {filteredResumes.length > 0 ? (
              filteredResumes.map((resume) => {
                return (
                  <ResumeGridCard
                    resume={resume}
                    previewSetting={previewSettingEntities[resume.id]}
                    key={resume.id}
                    onClick={() => handleResumeCardClicked(resume.id)}
                  />
                );
              })
            ) : (
              <div className="text-xl font-semibold">No Results</div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <NewResumeCard />
        </div>
      )}
    </>
  );
}
