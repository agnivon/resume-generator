import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { ResumeV2 } from "@prisma/client";
import { DOMAttributes } from "react";
import PreviewSettingsPanel from "./PreviewSettingsPanel";
import Drawer from "@/components/global/Drawer";
import PreviewExitButton from "./PreviewExitButton";

/* const RESUME_TEMPLATES = [
  TemplateType.STANDARD,
  TemplateType.BOLD,
  TemplateType.MODERN,
]; */

export default function ResumePreviewSidebar({
  resume,
}: {
  resume: ResumeV2;
  //previewSettings: ResumePreviewSettings
}) {
  // const [showAllPanels, setShowAllPanels] = React.useState<boolean>(false);

  // const [panel, setPanel] =
  //   React.useState<"settings" /*  | "template" */>("settings");

  /* const templatePanel = (
    <div className="flex flex-col items-center xl:justify-center gap-8">
      {RESUME_TEMPLATES.map((template) => {
        return (
          <TemplateCard
            template={template}
            key={template}
            sizeClass="a7"
            thumbnailScale={0.35}
          />
        );
      })}
    </div>
  ); */

  return (
    <>
      <div
        //className={classNames("group", showAllPanels ? "show-all-panels" : "")}
        className="max-xl:hidden print:hidden w-1/5"
      >
        <div className="fixed z-20 inset-y-0 left-0 flex w-1/5 min-h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className={"py-4 px-3 2xl:px-6 w-full"}>
            <PreviewExitButton />
            <PreviewSettingsPanel resume={resume} />
          </div>
        </div>
        {/* <div className="fixed z-20 inset-y-0 left-0 flex xl:w-1/4 min-h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div
            className={
              "py-4 pl-6 pr-3 xl:pr-6 w-full max-xl:hidden max-xl:group-[.show-all-panels]:block"
            }
          >
            <div className="-ml-2 mb-5 text-lg xl:text-xl font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <div
                onClick={(event) => {
                  if (panel === "template") {
                    setPanel("settings");
                  } else {
                    onBack?.(event);
                  } 
                  onBack?.(event);
                }}
                className="flex items-center cursor-pointer"
              >
                <ChevronLeftIcon
                  className="h-7 w-7"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <span className="leading-none">Go Back</span>
              </div>
              {panel === "template" && <div>Choose Template</div>}
            </div>
            <PreviewSettingsPanel resume={resume} />
            <RenderIf isTrue={panel === "template"}>
              <MotionDiv>{templatePanel}</MotionDiv>
            </RenderIf>
          </div>
          <div
            className={classNames(
              "xl:hidden w-8 cursor-pointer flex items-center justify-center h-full hover:bg-gray-100 hover:dark:bg-gray-700"
              //showSubLgPanel ? " mb-6" : "my-4"
            )}
            onClick={() => setShowAllPanels((show) => !show)}
          >
            <div className="flex items-center">
              <ChevronDoubleLeftIcon
                className={classNames(
                  "h-6 w-6",
                  !showAllPanels ? "rotate-180" : ""
                )}
              />
              <span>{`${showSubLgPanel ? "Close" : "Open"}  Settings`}</span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
