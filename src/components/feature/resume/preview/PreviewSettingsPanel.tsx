import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import MotionDiv from "@/components/global/motion/MotionDiv";
import {
  FONT_SELECT_OPTIONS,
  PAPER_SIZE_DROPDOWN_OPTIONS,
} from "@/constants/form.constants";
import { AccentColorList } from "@/constants/template.constants";
import useUpsertPreviewSettings from "@/hooks/resume/data/useUpsertPreviewSettings";
import { ResumePreviewSettings } from "@/types/template.types";
import { TypeKeys } from "@/types/utility.types";
import { getToastErrMessage } from "@/utils/form.utils";
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ResumeV2 } from "@prisma/client";
import { RangeSlider } from "flowbite-react";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import { useAlert } from "react-alert";
import PreviewTipsCard from "../tips/PreviewTipsCard";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumePageActions } from "@/reducers/ResumePageReducer";

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

export default function PreviewSettingsPanel({ resume }: { resume: ResumeV2 }) {
  const { dispatch } = useResumePageContext();
  const formik = useFormikContext<{ previewSettings: ResumePreviewSettings }>();

  const alert = useAlert();

  const upsertPreviewSettings = useUpsertPreviewSettings();

  const { values, setFieldValue } = formik;

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
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
  };

  const accentColorDropdownOptions = AccentColorList.map((color) => ({
    key: color.name,
    value: color.color,
  }));

  const valuesChanged = React.useMemo(
    () => !_.isEqualWith(formik.values, formik.initialValues),
    [formik.values, formik.initialValues]
  );

  return (
    <MotionDiv>
      <div className="flex flex-col gap-6">
        <div className="flex max-sm:flex-col xl:max-2xl:flex-col gap-3">
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
        <div className="flex max-sm:flex-col xl:max-2xl:flex-col gap-3">
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
  );
}
