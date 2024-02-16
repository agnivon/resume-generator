import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { NEW_EDUCATION } from "@/constants/resume.constants";
import { EDUCATION_TIPS } from "@/constants/tips.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import ResumeTipsCard from "../tips/ResumeTipsCard";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import { NEW_EDUCATION_V2 } from "@/constants/resume.v2.constants";
import DescriptionHelperText from "./DescriptionHelperText";

export default function EducationForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const {
    doEntitiesExist,
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
  } = useFormListManager(formik, "education", "education", NEW_EDUCATION_V2);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const listItems = (
    formik.values.resume.education.map((edu, idx) => {
      return {
        label: edu.major,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {edu.major || "Some Major"}
            </div>
            <div className="text-sm line-clamp-2">
              {edu.institution || "Some Institution"}
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
      label: "Add new education",
      content: <>{"Add new education"}</>,
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
        items={formik.values.resume.education}
        idExtractor={(edu) => edu.major}
        itemRenderer={(edu) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{edu.major || "Some Major"}</div>
              <div className="text-sm">
                {edu.institution || "Some Institution"}
              </div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="mb-6">
          <div className="col-span-2">
            <div className="text-lg mb-1 font-bold">Education</div>
          </div>
          <div className="col-span-2">
            <div className="mb-2">
              The education section of your resume is an essential component,
              especially for recent graduates and those early in their careers.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%] space-y-6">
            <div>
              <div className="text-lg mb-2 font-bold">Your Education</div>
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
            <ResumeTipsCard tips={EDUCATION_TIPS} />
          </div>
          <div className="w-full md:w-[70%] grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doEntitiesExist}>
              <div className="col-span-2 text-center dark:text-gray-400 text-gray-600">
                {`To add an education click on "Add new education" on the left
                panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doEntitiesExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select an education from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="What is your degree or major? *"
                    name={`${selectedEntityName}.major`}
                    placeholder="Bachelor or Engineering in Computer Science"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where did you earn your degree/qualification? *"
                    name={`${selectedEntityName}.institution`}
                    placeholder="University of Arizona, Tuscon"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where was this institution located? *"
                    name={`${selectedEntityName}.location`}
                    placeholder="Tuscon, AZ"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="When did you earn your degree/qualification?"
                    name={`${selectedEntityName}.year`}
                    placeholder="2023"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Did you minor in anything?"
                    name={`${selectedEntityName}.minor`}
                    placeholder="Philosophy"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="GPA"
                    name={`${selectedEntityName}.gpa`}
                    placeholder="3.9"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="Additional Information"
                    name={`${selectedEntityName}.additionalInfo`}
                    placeholder="Implemented static code analysis techniques to identify and rectify potential bugs, vulnerabilities, and style violations, ensuring adherence to industry best practices."
                    helperText={
                      <DescriptionHelperText
                        text={"Markdown supported"}
                        name={`${selectedEntityName}.additionalInfo`}
                      />
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Education"
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
