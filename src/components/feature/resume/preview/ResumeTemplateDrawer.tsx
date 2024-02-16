import Drawer, { DrawerProps } from "@/components/global/Drawer";
import { TemplateType } from "@/constants/template.constants";
import TemplateCard from "./TemplateCard";

const RESUME_TEMPLATES = [
  TemplateType.STANDARD,
  TemplateType.BOLD,
  TemplateType.MODERN,
];

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
