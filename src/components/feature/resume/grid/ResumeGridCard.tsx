import Badge, { BadgeColor } from "@/components/global/Badge";
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/global/Button";
import { TemplateSize } from "@/constants/template.constants";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useCloneResumeV2 from "@/hooks/resume/data/v2/useCloneResumeV2";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { useAlert } from "react-alert";
import ResumeCard, { ResumeCardProps } from "./ResumeCard";
import React from "react";

export default React.memo(function ResumeGridCard(props: ResumeCardProps) {
  const { resume } = props;

  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const insertResume = useCloneResumeV2();
  const { globalRunning } = useIsGlobalQueryRunning();

  const resumeTagEntities = useAppSelector(
    (state) => state.resume.tags.entities
  );

  const handleOnChange = async (value: "Edit" | "Clone" | "Delete") => {
    try {
      if (value === "Edit") {
        dispatch(ResumesPageActions.setShowEditResumeModal(resume));
      } else if (value === "Clone") {
        await insertResume.mutation.mutateAsync(resume.id);
        alert.success(`${resume.name} cloned`);
      } else if (value === "Delete") {
        dispatch(ResumesPageActions.setShowDeleteResumeModal(resume));
      }
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
  };

  return (
    <div className="flex max-sm:flex-col max-sm:items-center gap-2">
      <ResumeCard
        paperSize={TemplateSize.A4}
        showFooter={false}
        sizeClass="a8"
        scale={0.246}
        {...props}
      />
      <div className="flex flex-col max-sm:items-center justify-between sm:ml-6 my-1">
        <div
          className="line-clamp-2 font-semibold text-xl mb-2 text-gray-600 dark:text-gray-300 underline-offset-1 hover:underline hover:cursor-pointer"
          onClick={props.onClick}
        >
          {resume.name}
        </div>
        <div className="text-gray-500 dark:text-gray-400 mb-2 lg:mb-4 max-sm:text-center">
          <div className="line-clamp-1">{resume.companyName || "--"}</div>
          <div className="line-clamp-1">{resume.jobTitle || "--"}</div>
          <div className="line-clamp-1">{resume.experienceLevel || "--"}</div>
        </div>
        <div className="flex gap-2 flex-wrap items-start max-h-20 overflow-y-auto hide-scrollbar text-gray-500 dark:text-gray-400 max-sm:mb-4">
          {resume.tags.length > 0 ? (
            resume.tags.map((id) => {
              const tag = resumeTagEntities[id];
              return tag ? (
                <Badge key={tag.name} color={tag.color as BadgeColor} size="xs">
                  {tag.name}
                </Badge>
              ) : null;
            })
          ) : (
            <>No Tags</>
          )}
        </div>
        <div className="flex max-sm:justify-center w-full gap-4">
          <Tooltip content="Edit Metadata">
            <Button
              Icon={PencilIcon}
              variant={ButtonVariant.GRADIENT_MONO}
              size={ButtonSize.SMALL}
              onClick={() => handleOnChange("Edit")}
              disabled={globalRunning}
            />
          </Tooltip>
          <Tooltip content="Clone">
            <Button
              Icon={DocumentDuplicateIcon}
              variant={ButtonVariant.GRADIENT_MONO}
              size={ButtonSize.SMALL}
              color={ButtonColor.PURPLE}
              onClick={() => handleOnChange("Clone")}
              disabled={globalRunning}
            />
          </Tooltip>
          <Tooltip content="Delete">
            <Button
              Icon={TrashIcon}
              variant={ButtonVariant.GRADIENT_MONO}
              size={ButtonSize.SMALL}
              color={ButtonColor.RED}
              onClick={() => handleOnChange("Delete")}
              disabled={globalRunning}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
