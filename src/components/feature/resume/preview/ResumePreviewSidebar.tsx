import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import RenderIf from "@/components/global/RenderIf";
import MotionDiv from "@/components/global/motion/MotionDiv";
import {
  FONT_SELECT_OPTIONS,
  PAPER_SIZE_DROPDOWN_OPTIONS,
} from "@/constants/form.constants";
import { AccentColorList, TemplateType } from "@/constants/template.constants";
import useUpsertPreviewSettings from "@/hooks/resume/data/useUpsertPreviewSettings";
import { CompleteResume } from "@/types/resume.types";
import { ResumePreviewSettings } from "@/types/template.types";
import { TypeKeys } from "@/types/utility.types";
import { classNames } from "@/utils";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { RangeSlider } from "flowbite-react";
import { useFormikContext } from "formik";
import React, { DOMAttributes } from "react";
import { useAlert } from "react-alert";
import ResumeTemplateModal from "./ResumeTemplateModal";

/* const RESUME_TEMPLATES = [
  TemplateType.STANDARD,
  TemplateType.BOLD,
  TemplateType.MODERN,
]; */

const itemRenderer = (item: { key: string; value: string } | undefined) => (
  <div className="inline-flex gap-x-2 items-center">
    <div
      className="h-5 w-5 rounded-full border-2"
      style={{
        backgroundColor: item?.value || undefined,
      }}
    ></div>
    <div>{item?.key}</div>
  </div>
);

const NumericValueWidget = ({
  name,
  step = 0.05,
}: {
  name: TypeKeys<ResumePreviewSettings, number>;
  step?: number;
}) => {
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();
  const value = formik.values.previewSettings[name];
  return (
    <RangeSlider
      sizing={"sm"}
      min={0.0}
      max={2.0}
      step={step}
      value={value}
      onChange={(e) =>
        formik.setFieldValue(`previewSettings.${name}`, Number(e.target.value))
      }
    />
  );
};

export default function ResumePreviewSidebar({
  resume,
  onBack,
}: {
  resume: CompleteResume;
  onBack: DOMAttributes<HTMLDivElement>["onClick"];
}) {
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();

  const alert = useAlert();

  const upsertPreviewSettings = useUpsertPreviewSettings();

  const [showResumeTemplateModal, setShowResumeTemplateModal] =
    React.useState<boolean>(false);

  const [showAllPanels, setShowAllPanels] = React.useState<boolean>(false);

  const [panel, setPanel] =
    React.useState<"settings" /*  | "template" */>("settings");

  const { values, setFieldValue } = formik;

  const accentColorDropdownOptions = AccentColorList.map((color) => ({
    key: color.name,
    value: color.color,
  }));

  const printResumePdf = () => {
    window.print();
  };

  const savePreviewSettings = async () => {
    try {
      const resumeId = resume.id;
      const previewSettings = values.previewSettings;
      await upsertPreviewSettings.mutation.mutateAsync({
        resumeId,
        previewSettings,
      });
      alert.success("Preview settings saved");
    } catch {
      alert.error("Something went wrong");
    }
  };

  const settingsPanel = (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div className="w-full">
            <div className="text-sm mb-1">Font Family</div>
            <Dropdown
              items={FONT_SELECT_OPTIONS}
              value={values.previewSettings.font}
              onChange={(value) => setFieldValue("previewSettings.font", value)}
              customMenuClassNames="!w-full"
              dropdownButtonProps={{
                color: ButtonColor.LIGHT,
                customClassNames: "w-full",
              }}
              selectedValueRenderer={(item) => (
                <span className="line-clamp-1">{item?.key}</span>
              )}
            />
          </div>
          <div className="w-full">
            <div className="text-sm mb-1">Paper Size</div>
            <Dropdown
              items={PAPER_SIZE_DROPDOWN_OPTIONS}
              value={values.previewSettings.paperSize}
              onChange={(value) =>
                setFieldValue("previewSettings.paperSize", value)
              }
              customMenuClassNames="!w-full"
              dropdownButtonProps={{
                color: ButtonColor.LIGHT,
                customClassNames: "w-full",
              }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <div className="text-sm mb-1">{`Font Size: ${(
              values.previewSettings.fontSize * 10
            ).toFixed(1)}`}</div>
            <NumericValueWidget name="fontSize" />
          </div>
          <div className="w-full">
            <div className="text-sm mb-1">{`Line Height: ${(
              values.previewSettings.lineHeight * 10
            ).toFixed(1)}`}</div>
            <NumericValueWidget name="lineHeight" />
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-sm mb-1">Accent Color</div>
          <Dropdown
            items={accentColorDropdownOptions}
            value={values.previewSettings.accentColor}
            onChange={(value) =>
              setFieldValue("previewSettings.accentColor", value)
            }
            customMenuClassNames="!w-full"
            selectedValueRenderer={itemRenderer}
            contentRenderer={itemRenderer}
            dropdownButtonProps={{
              color: ButtonColor.LIGHT,
              customClassNames: "w-full",
            }}
            customMenuButtonClassNames="flex items-center"
          />
        </div>
        <Button
          label={"Choose Template"}
          Icon={DocumentTextIcon}
          color={ButtonColor.LIGHT}
          size={ButtonSize.SMALL}
          onClick={() => {
            setShowResumeTemplateModal(true);
          }}
        />
        <Button
          label="Save Settings"
          color={ButtonColor.LIGHT}
          onClick={savePreviewSettings}
          size={ButtonSize.SMALL}
          processing={upsertPreviewSettings.isPending}
        />
        <Button
          label="Print PDF"
          Icon={ArrowDownTrayIcon}
          color={ButtonColor.LIGHT}
          onClick={printResumePdf}
          size={ButtonSize.SMALL}
        />
      </div>
    </>
  );

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
      <ResumeTemplateModal
        show={showResumeTemplateModal}
        onClose={() => setShowResumeTemplateModal(false)}
      />
      <div
        className={classNames("group", showAllPanels ? "show-all-panels" : "")}
      >
        <div className="fixed z-20 inset-y-0 left-0 flex xl:w-1/4 h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div
            className={
              "py-4 pl-6 pr-3 xl:pr-6 w-full max-xl:hidden max-xl:group-[.show-all-panels]:block"
            }
          >
            <div className="-ml-2 mb-5 text-lg xl:text-xl font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <div
                onClick={(event) => {
                  /* if (panel === "template") {
                    setPanel("settings");
                  } else {
                    onBack?.(event);
                  } */
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
              {/* {panel === "template" && <div>Choose Template</div>} */}
            </div>
            <RenderIf isTrue={panel === "settings"}>
              <MotionDiv>{settingsPanel}</MotionDiv>
            </RenderIf>
            {/* <RenderIf isTrue={panel === "template"}>
              <MotionDiv>{templatePanel}</MotionDiv>
            </RenderIf> */}
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
              {/* <span>{`${showSubLgPanel ? "Close" : "Open"}  Settings`}</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
