import { SAMPLE_RESUME_1 } from "@/constants/sample.resumes";
import {
  TemplateAccentColors,
  TemplateFont,
  TemplateSize,
  TemplateType,
} from "@/constants/template.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { usePreviewSettingForm } from "@/hooks/resume/preview/usePreviewSettingForm";
import { classNames } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import ResumeCard from "../grid/ResumeCard";

export const TemplateCard = ({
  template,
  sizeClass = "a6",
  thumbnailScale = 0.5,
}: {
  template: TemplateType;
  sizeClass?: string;
  thumbnailScale?: number;
}) => {
  const { value } = useResumePageContext();
  const { previewSettingsForm: previewSettings, handleValueChanged } =
    usePreviewSettingForm(value.resume.id);
  const selectedTemplate = previewSettings.template;
  const isTemplateSelected = template === selectedTemplate;
  return (
    <>
      <div
        key={template}
        className={classNames(
          "flex flex-col justify-center items-center gap-y-2 group cursor-pointer"
        )}
        onClick={() => handleValueChanged({ template })}
      >
        <div
          className={classNames(
            "w-full rounded-lg py-1 text-center",
            isTemplateSelected
              ? "bg-blue-600 group-hover:bg-blue-700 text-white"
              : "text-gray-500 dark:text-gray-300 font-semibold bg-gray-100 dark:bg-gray-600 group-hover:bg-gray-200 dark:group-hover:bg-gray-500 "
          )}
        >
          <span className="inline-flex text-sm items-center gap-x-2 uppercase">
            {template}
            {isTemplateSelected && (
              <CheckCircleIcon className="inline h-4 w-4" />
            )}
          </span>
        </div>
        <div>
          <ResumeCard
            resume={SAMPLE_RESUME_1}
            template={template}
            paperSize={TemplateSize.A4}
            scale={thumbnailScale}
            sizeClass={sizeClass}
            showFooter={false}
            font={previewSettings.font as TemplateFont}
            fontSize={previewSettings.fontSize}
            accentColor={TemplateAccentColors[template][0].color}
          />
        </div>
      </div>
    </>
  );
};

export default TemplateCard;
