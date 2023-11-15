import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Card from "@/components/global/Card";
import Dropdown from "@/components/global/Dropdown";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { TemplateFont, TemplateSize } from "@/constants/template.constants";
import useUpsertPreviewSettings from "@/hooks/resume/data/useUpsertPreviewSettings";
import { ResumePreviewSettings } from "@/types/form.types";
import { TypeKeys } from "@/types/utility.types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import React from "react";
import ResumeTemplateDrawer from "./ResumeTemplateDrawer";
import { useResumePageContext } from "@/context/ResumePageContextProvider";
import { useAlert } from "react-alert";

const FONT_SELECT_OPTIONS = [
  { key: "Merriweather", value: TemplateFont.MERRIWEATHER },
  { key: "Source Sans 3", value: TemplateFont.SOURCE_SANS },
  { key: "Deja Vu Serif", value: TemplateFont.DEJA_VU_SERIF },
  { key: "Roboto Mono", value: TemplateFont.ROBOTO_MONO },
  { key: "AR One Sans", value: TemplateFont.AR_ONE_SANS },
];

const PAPER_SIZE_DROPDOWN_OPTIONS = [
  { key: "Letter", value: TemplateSize.LETTER },
  { key: "A4", value: TemplateSize.A4 },
];

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
    <div className="flex items-center gap-x-3">
      <Button
        Icon={PlusIcon}
        color={ButtonColor.LIGHT}
        size={ButtonSize.EXTRA_SMALL}
        customIconClassNames="!m-0 !h-4 !w-4"
        onClick={() =>
          formik.setFieldValue(`previewSettings.${name}`, value + step)
        }
      />
      <div>{(value * 10).toFixed(1)}</div>
      <Button
        Icon={MinusIcon}
        color={ButtonColor.LIGHT}
        size={ButtonSize.EXTRA_SMALL}
        customIconClassNames="!m-0 !h-4 !w-4"
        onClick={() =>
          formik.setFieldValue(`previewSettings.${name}`, value - step)
        }
      />
    </div>
  );
};

export default function ResumePreviewToolbar() {
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();

  const { value } = useResumePageContext();
  const alert = useAlert();

  const upsertPreviewSettings = useUpsertPreviewSettings();

  const [showFontPanel, setShowFontPanel] = React.useState<boolean>(false);
  const [showTemplateDrawer, setShowTemplateDrawer] =
    React.useState<boolean>(false);
  const printResumePdf = () => {
    window.print();
  };

  const savePreviewSettings = async () => {
    try {
      const resumeId = value.resume.id;
      const previewSettings = formik.values.previewSettings;
      await upsertPreviewSettings.mutation.mutateAsync({
        resumeId,
        previewSettings,
      });
      alert.success("Preview settings saved");
    } catch {
      alert.error("Something went wrong");
    }
  };

  return (
    <>
      <ResumeTemplateDrawer
        show={showTemplateDrawer}
        onClose={() => setShowTemplateDrawer(false)}
      />
      <Card customClassNames="!p-3 flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <Button
            label={showFontPanel ? "Hide Font Settings" : "Show Font Settings"}
            Icon={showFontPanel ? ChevronLeftIcon : ChevronRightIcon}
            color={ButtonColor.LIGHT}
            size={ButtonSize.SMALL}
            onClick={() => setShowFontPanel((show) => !show)}
            customClassNames="shrink-0"
          />

          {showFontPanel && (
            <MotionDiv className="flex items-center gap-x-4">
              <div className="text-sm">Font Family</div>
              {/* <FormikSelect
                  name="previewSettings.font"
                  options={FONT_SELECT_OPTIONS}
                  size={SelectSize.SMALL}
                  containerClassNames="w-fit"
                  showSubText={false}
                /> */}
              <Dropdown
                items={FONT_SELECT_OPTIONS}
                value={formik.values.previewSettings.font}
                onChange={(value) =>
                  formik.setFieldValue("previewSettings.font", value)
                }
                dropdownButtonProps={{ color: ButtonColor.LIGHT }}
              />
              <div className="text-sm">Font Size</div>
              <NumericValueWidget name="fontSize" />
              <div className="text-sm">Line Height</div>
              <NumericValueWidget name="lineHeight" />
            </MotionDiv>
          )}
          {!showFontPanel && (
            <MotionDiv className="flex justify-between items-center gap-x-3">
              <Button
                label={"Choose Template"}
                Icon={DocumentTextIcon}
                color={ButtonColor.LIGHT}
                size={ButtonSize.SMALL}
                onClick={() => setShowTemplateDrawer(true)}
              />
              <div className="text-sm">Paper Size</div>
              {/* <FormikSelect
                  name="previewSettings.paperSize"
                  options={PAPER_SIZE_SELECT_OPTIONS}
                  size={SelectSize.SMALL}
                  containerClassNames="w-fit"
                  showSubText={false}
                /> */}
              <Dropdown
                items={PAPER_SIZE_DROPDOWN_OPTIONS}
                value={formik.values.previewSettings.paperSize}
                onChange={(value) =>
                  formik.setFieldValue("previewSettings.paperSize", value)
                }
                dropdownButtonProps={{ color: ButtonColor.LIGHT }}
              />
            </MotionDiv>
          )}
        </div>
        {!showFontPanel && (
          <MotionDiv className="flex items-center gap-x-3">
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
          </MotionDiv>
        )}
      </Card>
    </>
  );
}
