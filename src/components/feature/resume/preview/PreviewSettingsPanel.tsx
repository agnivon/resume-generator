import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import RenderIf from "@/components/global/RenderIf";
import MotionDiv from "@/components/global/motion/MotionDiv";
import {
  FONT_SELECT_OPTIONS,
  PAPER_SIZE_DROPDOWN_OPTIONS,
} from "@/constants/form.constants";
import {
  AccentColorList,
  TemplateFont,
  TemplateSize,
} from "@/constants/template.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import useUpsertPreviewSettings from "@/hooks/resume/data/useUpsertPreviewSettings";
import { usePreviewSettingForm } from "@/hooks/resume/preview/usePreviewSettingForm";
import { ResumePageActions } from "@/reducers/ResumePageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ResumeV2 } from "@prisma/client";
import { RangeSlider } from "flowbite-react";
import _ from "lodash";
import React from "react";
import { useAlert } from "react-alert";
import PreviewTipsCard from "../tips/PreviewTipsCard";

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
  value,
  onChange,
  step = 0.05,
}: {
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  step?: number;
}) => {
  return (
    <RangeSlider
      sizing={"sm"}
      min={0.0}
      max={2.0}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
};

export default function PreviewSettingsPanel({ resume }: { resume: ResumeV2 }) {
  const { dispatch, value } = useResumePageContext();

  const alert = useAlert();

  const upsertPreviewSettings = useUpsertPreviewSettings();

  const { previewSettingsForm, handleValueChanged } = usePreviewSettingForm(
    resume.id
  );

  const printResumePdf = () => {
    window.print();
  };

  const savePreviewSettings = async () => {
    try {
      const resumeId = resume.id;
      const previewSettings = previewSettingsForm;
      await upsertPreviewSettings.mutation.mutateAsync({
        resumeId,
        previewSettings,
      });
      alert.success("Preview settings saved");
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
  };

  const accentColorDropdownOptions = AccentColorList.map((color) => ({
    key: color.name,
    value: color.color,
  }));

  const valuesChanged = React.useMemo(
    () => !_.isEqualWith(previewSettingsForm, value.previewSettings),
    [previewSettingsForm, value.previewSettings]
  );

  return (
    <RenderIf isTrue={Boolean(previewSettingsForm)}>
      <MotionDiv>
        <div className="flex flex-col gap-6">
          <div className="flex max-sm:flex-col xl:max-2xl:flex-col gap-3">
            <div className="w-full">
              <div className="text-sm mb-1">Font Family</div>
              <Dropdown
                items={FONT_SELECT_OPTIONS}
                value={previewSettingsForm.font as TemplateFont}
                onChange={(value) => {
                  handleValueChanged({ font: value });
                }}
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
                value={previewSettingsForm.paperSize as TemplateSize}
                onChange={(value) => {
                  handleValueChanged({ paperSize: value });
                }}
                customMenuClassNames="!w-full"
                dropdownButtonProps={{
                  color: ButtonColor.LIGHT,
                  customClassNames: "w-full",
                }}
              />
            </div>
          </div>
          <div className="flex max-sm:flex-col xl:max-2xl:flex-col gap-3">
            <div className="w-full">
              <div className="text-sm mb-1">{`Font Size: ${(
                previewSettingsForm.fontSize * 10
              ).toFixed(1)}`}</div>
              <NumericValueWidget
                value={previewSettingsForm.fontSize}
                onChange={(e) => {
                  handleValueChanged({ fontSize: parseFloat(e.target.value) });
                }}
              />
            </div>
            <div className="w-full">
              <div className="text-sm mb-1">{`Line Height: ${(
                previewSettingsForm.lineHeight * 10
              ).toFixed(1)}`}</div>
              <NumericValueWidget
                value={previewSettingsForm.lineHeight}
                onChange={(e) => {
                  handleValueChanged({
                    lineHeight: parseFloat(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-sm mb-1">Accent Color</div>
            <Dropdown
              items={accentColorDropdownOptions}
              value={previewSettingsForm.accentColor}
              onChange={(value) => {
                handleValueChanged({ accentColor: value });
              }}
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
              dispatch(ResumePageActions.setShowResumeTemplateModal(true));
            }}
          />
          <Button
            label={
              <>
                {valuesChanged && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                )}
                <span>Save Settings</span>
              </>
            }
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
          <div className="mb-6">
            <PreviewTipsCard />
          </div>
        </div>
      </MotionDiv>
    </RenderIf>
  );
}
