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
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import { getTextAreaRows } from "@/utils/form.utils";
import ResumeTipsCard from "../tips/ResumeTipsCard";
import { EXPERIENCE_TIPS } from "@/constants/tips.constants";
import { NEW_EXPERIENCE_V2 } from "@/constants/resume.v2.constants";
import DescriptionHelperText from "./DescriptionHelperText";

export default function ExperienceForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const {
    doEntitiesExist,
    selectedEntity,
    selectedEntityName,
    selectedItemIdx,
    changeIdx,
    setChangeIdx,
    deleteIdx,
    setDeleteIdx,
    isMutationPending,
    handleAddNewItem,
    handleDeleteItem,
    handleListItemClicked,
    handleUnsavedListItemChange,
    getListItemContent,
    handleSequenceChange,
    getDraggableListItemContent,
  } = useFormListManager(
    formik,
    "experiences",
    "experience",
    NEW_EXPERIENCE_V2
  );

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const listItems = (
    formik.values.resume.experiences.map((exp, idx) => {
      return {
        label: exp.role,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2 space-x-1">
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
        <div className="mb-6">
          <div className="col-span-2">
            <div className="text-lg mb-1 font-bold">Employment History</div>
          </div>
          <div className="col-span-2">
            <div className="mb-2">
              Your employment history is a critical section of your resume,
              providing a detailed account of your work experience.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%] space-y-6">
            <div>
              <div className="text-lg font-bold mb-2">Your Experiences</div>
              <ListGroup items={listItems} />
              {doEntitiesExist && (
                <Button
                  label="Change sequence"
                  onClick={() => setShowListSequenceChangeModal(true)}
                  color={ButtonColor.ALT}
                  size={ButtonSize.SMALL}
                  customClassNames="mt-4 w-full"
                />
              )}
            </div>
            <ResumeTipsCard tips={EXPERIENCE_TIPS} />
          </div>
          <div className="w-full md:w-[70%] grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doEntitiesExist}>
              <div className="col-span-2 text-center dark:text-gray-400 text-gray-600">
                {`To add an experience click on "Add new experience" on the left
                panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doEntitiesExist}>
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
                    name={`${selectedEntityName}.role`}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="For which company did you work? *"
                    name={`${selectedEntityName}.companyName`}
                    placeholder="Google"
                  />
                </div>
                <div className="col-span-2">
                  <Label label="How long were you with the company? *" />
                  <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-y-2 gap-x-4">
                    <div className="col-span-2 md:col-span-1">
                      <FormikDatepicker
                        //type="month"
                        name={`${selectedEntityName}.startDate`}
                        placeholder="Start Date"
                        format={START_END_DATE_FORMAT}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormikDatepicker
                        name={`${selectedEntityName}.endDate`}
                        //type="month"
                        placeholder="End Date"
                        disabled={Boolean(selectedEntity?.currentlyWorking)}
                        format={START_END_DATE_FORMAT}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormikSwitch
                        name={`${selectedEntityName}.currentlyWorking`}
                        label="Currently working here"
                        containerClassNames="mt-1 shrink-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where was the company located?"
                    name={`${selectedEntityName}.companyLocation`}
                    placeholder="New York, NY"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="What did you do at the company?"
                    name={`${selectedEntityName}.description`}
                    placeholder="Led the development of a critical component in Google's Search infrastructure, resulting in a 20% reduction in response times for complex search queries."
                    helperText={
                      <DescriptionHelperText
                        text={"Markdown supported"}
                        name={`${selectedEntityName}.description`}
                      />
                    }
                    rows={getTextAreaRows(selectedEntity?.description)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Experiences"
                    type="submit"
                    //disabled=\{!formik\.isValid\}
                    processing={formik.isSubmitting || isMutationPending}
                    customClassNames="w-full"
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
