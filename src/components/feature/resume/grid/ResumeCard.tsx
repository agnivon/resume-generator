import Card from "@/components/global/Card";
import Dropdown from "@/components/global/Dropdown";
import { useHomePageContext } from "@/context/HomePageContextProvider";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useInsertCompleteResume from "@/hooks/resume/data/useInsertCompleteResume";
import { HomePageActions } from "@/reducers/HomePageReducer";
import { classNames } from "@/utils";
import { getResumeFromCompleteResume } from "@/utils/resume.utils";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";
import { useAlert } from "react-alert";
import {
  ResumeTemplate,
  TemplateFont,
} from "../../../../constants/template.constants";
import { selectPreviewSettingByResumeId } from "../../../../redux/slices/resumeSlice";
import Template, { ResumeTemplateProps } from "../template/ResumeTemplate";

type ResumeCardProps = ResumeTemplateProps & {
  showFooter?: boolean;
  usePreviewSettings?: boolean;
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
  const { dispatch } = useHomePageContext();
  const insertResume = useInsertCompleteResume();
  const { globalRunning } = useIsGlobalQueryRunning();

  const handleOnChange = async (value: string | number | null) => {
    try {
      if (value === "Edit") {
        dispatch(
          HomePageActions.setShowEditResumeModal(
            getResumeFromCompleteResume(resume)
          )
        );
      } else if (value === "Clone") {
        await insertResume.mutation.mutateAsync({
          ...resume,
          name: `${resume.name} (Copy)`,
          createdOn: Date.now(),
        });
        alert.success(`${resume.name} cloned`);
      } else if (value === "Delete") {
        dispatch(
          HomePageActions.setShowDeleteResumeModal(
            getResumeFromCompleteResume(resume)
          )
        );
      }
    } catch {
      alert.error("Something went wrong");
    }
  };

  return (
    <div className="text-gray-600 dark:text-white flex bg-gray-100 dark:bg-gray-700 rounded-b-md w-full justify-center py-2">
      <div className="w-full flex items-center px-2 justify-between">
        <div className="truncate">{resume.name}</div>
        <div onClick={(e) => e.stopPropagation()} className="h-6 w-6">
          <Dropdown
            value={null}
            onChange={handleOnChange}
            disabled={globalRunning}
            items={RESUME_ACTIONS_DROPDOWN_ITEMS}
            customClassNames="-left-28"
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
    usePreviewSettings = true,
    sizeClass = "a8",
    onClick,
    ...templateProps
  } = props;

  const previewSetting = useAppSelector(
    selectPreviewSettingByResumeId(props.resume.id)
  );

  const previewSettingProps = usePreviewSettings
    ? {
        template: previewSetting?.template as ResumeTemplate | undefined,
        font: previewSetting?.font as TemplateFont | undefined,
        fontSize: previewSetting?.fontSize,
        lineHeight: previewSetting?.lineHeight,
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
              {...previewSettingProps}
              {...templateProps}
            />
            <div className="absolute w-full h-full bottom-0 left-0 right-0 top-0 bg-gray-700 opacity-0 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.2]"></div>
          </div>
          {showFooter && <ResumeCardFooter {...props} />}
        </Card>
      </div>
    </div>
  );
}
