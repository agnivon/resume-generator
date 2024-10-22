import Card from "@/components/global/Card";
import Dropdown from "@/components/global/Dropdown";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import useCloneResumeV2 from "@/hooks/resume/data/v2/useCloneResumeV2";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { classNames } from "@/utils";
import { getToastErrMessage } from "@/utils/form.utils";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ResumePreviewSettings } from "@prisma/client";
import { MouseEventHandler } from "react";
import { useAlert } from "react-alert";
import {
  TemplateFont,
  TemplateType,
} from "../../../../constants/template.constants";
import Template, { ResumeTemplateProps } from "../template/ResumeTemplate";

export type ResumeCardProps = ResumeTemplateProps & {
  previewSetting?: ResumePreviewSettings;
  showFooter?: boolean;
  sizeClass?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  onEdit?: () => void;
  onClone?: () => void;
  onDelete?: () => void;
};

const RESUME_ACTIONS_DROPDOWN_ITEMS = [
  { key: "Edit", value: "Edit" },
  { key: "Clone", value: "Clone" },
  { key: "Delete", value: "Delete" },
];

const ResumeCardFooter = (props: ResumeCardProps) => {
  const { resume } = props;

  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const insertResume = useCloneResumeV2();
  const { globalRunning } = useIsGlobalQueryRunning();

  const handleOnChange = async (value: string | number | null) => {
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
    <div className="text-gray-600 dark:text-white flex bg-gray-100 dark:bg-gray-700 rounded-b-md w-full justify-center py-2">
      <div className="w-full flex items-center px-2 justify-between">
        <div className="truncate">{resume.name}</div>
        <div onClick={(e) => e.stopPropagation()} className="h-6 w-6">
          <Dropdown
            value={""}
            onChange={handleOnChange}
            disabled={globalRunning}
            items={RESUME_ACTIONS_DROPDOWN_ITEMS}
            customMenuClassNames="-left-28"
            ButtonComponent={(props) => (
              <button onClick={props.onClick} className="hover:animate-pulse">
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-600 dark:text-white" />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default function ResumeCard(props: ResumeCardProps) {
  const {
    showFooter = true,
    previewSetting,
    sizeClass = "a8",
    onClick,
    ...templateProps
  } = props;

  const previewSettingProps = previewSetting
    ? {
        template: previewSetting?.template as TemplateType | undefined,
        font: previewSetting?.font as TemplateFont | undefined,
        fontSize: previewSetting?.fontSize,
        lineHeight: previewSetting?.lineHeight,
        accentColor: previewSetting?.accentColor,
      }
    : {};

  return (
    <div className={sizeClass}>
      <div className="border border-transparent cursor-pointer group h-full space-y-4 relative">
        <Card
          customClassNames="h-full flex flex-col relative !shadow-none !p-0"
          onClick={onClick}
        >
          <div
            className={classNames(
              "overflow-hidden relative",
              showFooter ? "rounded-t-md" : "rounded-md"
            )}
          >
            <Template
              thumbnail={true}
              scale={0.233}
              selectableText={false}
              {...previewSettingProps}
              {...templateProps}
            />
            <div className="absolute w-full h-full bottom-0 left-0 right-0 top-0 bg-gray-700 transition-opacity opacity-0 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.2]"></div>
          </div>
          {showFooter && <ResumeCardFooter {...props} />}
        </Card>
      </div>
    </div>
  );
}
