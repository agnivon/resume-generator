import Drawer, { DrawerProps } from "@/components/global/Drawer";
import { SAMPLE_RESUME_1 } from "@/constants/sample.resumes";
import {
  TemplateType,
  TemplateAccentColors,
  TemplateSize,
} from "@/constants/template.constants";
import { ResumePreviewSettings } from "@/types/template.types";
import { classNames } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import ResumeCard from "../grid/ResumeCard";

const RESUME_TEMPLATES = [
  TemplateType.STANDARD,
  TemplateType.BOLD,
  TemplateType.MODERN,
];

export const TemplateCard = ({
  template,
  sizeClass = "a6",
  thumbnailScale = 0.5,
}: {
  template: TemplateType;
  sizeClass?: string;
  thumbnailScale?: number;
}) => {
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();
  const selectedTemplate = formik.values.previewSettings.template;
  const isTemplateSelected = template === selectedTemplate;
  return (
    <>
      <div
        key={template}
        className={classNames(
          "flex flex-col justify-center items-center gap-y-2 group cursor-pointer"
        )}
        onClick={() =>
          formik.setFieldValue("previewSettings.template", template)
        }
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
            thumbnailScale={thumbnailScale}
            sizeClass={sizeClass}
            showFooter={false}
            font={formik.values.previewSettings.font}
            fontSize={formik.values.previewSettings.fontSize}
            accentColor={TemplateAccentColors[template][0].color}
          />
        </div>
      </div>
    </>
  );
};

type ResumeTemplateDrawerProps = DrawerProps;

export default function ResumeTemplateDrawer(props: ResumeTemplateDrawerProps) {
  return (
    <Drawer
      position="right"
      customClasses="!w-[30rem] hide-scrollbar"
      {...props}
    >
      <div className="mb-4 text-xl font-semibold text-gray-500 dark:text-gray-400">
        Choose a template
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        {RESUME_TEMPLATES.map((template) => {
          return <TemplateCard template={template} key={template} />;
        })}
      </div>
    </Drawer>
  );
}
