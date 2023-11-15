import { ButtonSize, ButtonColor } from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import FormikSwitch from "@/components/global/forms/formik/FormikSwitch";
import {
  MONTHS_DROPDOWN_OPTIONS,
  YEARS_DROPDOWN_OPTIONS,
} from "@/constants/form.constants";
import { ResumeFormValues } from "@/types/form.types";
import { useFormikContext } from "formik";

type EntityWithDuration = {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyWorking: boolean;
};

type DurationFieldsProps<T extends EntityWithDuration> = {
  selectedEntity: T | null;
  selectedEntityName: string;
};

export default function DurationFields<T extends EntityWithDuration>(
  props: DurationFieldsProps<T>
) {
  const { selectedEntity, selectedEntityName } = props;
  const formik = useFormikContext<ResumeFormValues>();
  return (
    <>
      <Dropdown
        value={selectedEntity?.startMonth || ""}
        onChange={(value) => {
          formik.setFieldValue(`${selectedEntityName}.startMonth`, value);
        }}
        items={MONTHS_DROPDOWN_OPTIONS}
        dropdownButtonProps={{
          size: ButtonSize.BASE,
          color: ButtonColor.LIGHT,
        }}
      />
      <Dropdown
        value={selectedEntity?.startYear || ""}
        onChange={(value) => {
          formik.setFieldValue(`${selectedEntityName}.startYear`, value);
        }}
        items={YEARS_DROPDOWN_OPTIONS}
        dropdownButtonProps={{
          size: ButtonSize.BASE,
          color: ButtonColor.LIGHT,
        }}
      />
      <Dropdown
        value={selectedEntity?.endMonth || ""}
        onChange={(value) => {
          formik.setFieldValue(`${selectedEntityName}.endMonth`, value);
        }}
        items={MONTHS_DROPDOWN_OPTIONS}
        dropdownButtonProps={{
          size: ButtonSize.BASE,
          color: ButtonColor.LIGHT,
          disabled: selectedEntity?.currentlyWorking,
        }}
      />
      <Dropdown
        value={selectedEntity?.endYear || ""}
        onChange={(value) => {
          formik.setFieldValue(`${selectedEntityName}.endYear`, value);
        }}
        items={YEARS_DROPDOWN_OPTIONS}
        dropdownButtonProps={{
          size: ButtonSize.BASE,
          color: ButtonColor.LIGHT,
          disabled: selectedEntity?.currentlyWorking,
        }}
      />
      <FormikSwitch
        name={`${selectedEntityName}.currentlyWorking`}
        label="Currently working here"
        containerClassNames="mt-1"
        showSubText={false}
      />
    </>
  );
}
