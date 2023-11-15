import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import Label from "@/components/global/forms/Label";
import FormikDatepicker from "@/components/global/forms/formik/FormikDatepicker";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikSwitch from "@/components/global/forms/formik/FormikSwitch";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { START_END_DATE_FORMAT } from "@/constants/date.constants";
import { NEW_EXPERIENCE } from "@/constants/resume.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import { getTextAreaRows } from "@/utils/form.utils";

export default function ExperienceForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const {
    selectedItemIdx,
    changeIdx,
    setChangeIdx,
    deleteIdx,
    setDeleteIdx,
    isFormValid,
    isMutationPending,
    handleAddNewItem,
    handleDeleteItem,
    handleListItemClicked,
    handleUnsavedListItemChange,
    getListItemContent,
    handleSequenceChange,
    getDraggableListItemContent,
    handleSaveForm,
  } = useFormListManager(formik, "experiences", "experience", NEW_EXPERIENCE);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const doExperiencesExist = formik.values.resume.experiences.length > 0;

  const selectedExperience = _.isNumber(selectedItemIdx)
    ? formik.values.resume.experiences[selectedItemIdx]
    : null;

  const selectedExpName = `resume.experiences.${selectedItemIdx}`;

  const listItems = (
    formik.values.resume.experiences.map((exp, idx) => {
      return {
        label: exp.role,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {exp.role || "Some Role"}
            </div>
            <div className="text-sm line-clamp-2">
              {exp.companyName || "Some Company"}
            </div>
          </>,
          idx
        ),
        onClick: () => handleListItemClicked(idx),
        selected: selectedItemIdx === idx,
      };
    }) as ListItem[]
  ).concat([
    {
      label: "Add new experience",
      content: <>{"Add new experience"}</>,
      Icon: PlusIcon,
      onClick: handleAddNewItem,
    },
  ] as ListItem[]);

  return (
    <>
      <ConfirmationModal
        show={_.isNumber(changeIdx)}
        onClose={() => setChangeIdx(null)}
        message="If you continue without saving, your changes will be lost. Do you
        wish to continue?"
        onConfirm={handleUnsavedListItemChange}
      />
      <ConfirmationModal
        show={_.isNumber(deleteIdx)}
        onClose={() => setDeleteIdx(null)}
        message="Do you wish to permanently delete this record?"
        onConfirm={handleDeleteItem}
      />
      <ListItemSequenceChangeModal
        show={showListSequenceChangeModal}
        onClose={() => setShowListSequenceChangeModal(false)}
        items={formik.values.resume.experiences}
        idExtractor={(exp) => exp.role}
        itemRenderer={(exp) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{exp.role || "Some Role"}</div>
              <div className="text-sm">{exp.companyName || "Some Company"}</div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex gap-x-8 items-start">
          <div className="w-1/4">
            <div className="text-lg font-bold mb-2">Your Experiences</div>
            <ListGroup items={listItems} />
            <Button
              label="Change sequence"
              onClick={() => setShowListSequenceChangeModal(true)}
              color={ButtonColor.ALT}
              size={ButtonSize.SMALL}
              customClassNames="mt-4 w-full"
            />
          </div>
          <div className="w-3/4 grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doExperiencesExist}>
              <div className="col-span-2 text-center">
                {`To add an experience click on "Add new experience" on the left
                panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doExperiencesExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select an experience from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="What was your role at the company? *"
                    name={`${selectedExpName}.role`}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="For which company did you work? *"
                    name={`${selectedExpName}.companyName`}
                    placeholder="Google"
                  />
                </div>
                <div className="col-span-2">
                  <Label label="How long were you with the company? *" />
                  <div className="flex items-center gap-x-4">
                    <FormikDatepicker
                      //type="month"
                      name={`${selectedExpName}.startDate`}
                      placeholder="Start Date"
                      format={START_END_DATE_FORMAT}
                    />
                    <FormikDatepicker
                      name={`${selectedExpName}.endDate`}
                      //type="month"
                      placeholder="End Date"
                      disabled={Boolean(selectedExperience?.currentlyWorking)}
                      format={START_END_DATE_FORMAT}
                    />
                    <FormikSwitch
                      name={`${selectedExpName}.currentlyWorking`}
                      label="Currently working here"
                      containerClassNames="mt-1"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where was the company located?"
                    name={`${selectedExpName}.companyLocation`}
                    placeholder="New York, NY"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="What did you do at the company?"
                    name={`${selectedExpName}.description`}
                    placeholder="Led the development of a critical component in Google's Search infrastructure, resulting in a 20% reduction in response times for complex search queries."
                    helperText="Markdown supported"
                    rows={getTextAreaRows(selectedExperience?.description)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Experiences"
                    type="button"
                    //disabled={!isFormValid}
                    processing={formik.isSubmitting || isMutationPending}
                    customClassNames="w-full"
                    onClick={handleSaveForm}
                  />
                </div>
              </RenderIf>
            </RenderIf>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}
