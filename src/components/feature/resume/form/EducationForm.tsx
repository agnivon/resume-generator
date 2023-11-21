import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import { NEW_EDUCATION } from "@/constants/resume.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import React from "react";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";

export default function EducationForm() {
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
  } = useFormListManager(formik, "education", "education", NEW_EDUCATION);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const doesEducationExist = formik.values.resume.education.length > 0;

  const selectedEduName = `resume.education.${selectedItemIdx}`;

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
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/4">
            <div className="text-lg mb-2 font-bold">Your Education</div>
            <ListGroup items={listItems} />
            <Button
              label="Change sequence"
              onClick={() => setShowListSequenceChangeModal(true)}
              color={ButtonColor.ALT}
              size={ButtonSize.SMALL}
              customClassNames="mt-4 w-full"
            />
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doesEducationExist}>
              <div className="col-span-2 text-center dark:text-white text-gray-600">
                {`To add an education click on "Add new education" on the left
                panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doesEducationExist}>
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
                    name={`${selectedEduName}.major`}
                    placeholder="Bachelor or Engineering in Computer Science"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where did you earn your degree/qualification? *"
                    name={`${selectedEduName}.institution`}
                    placeholder="University of Arizona, Tuscon"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where was this institution located? *"
                    name={`${selectedEduName}.location`}
                    placeholder="Tuscon, AZ"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="When did you earn your degree/qualification?"
                    name={`${selectedEduName}.year`}
                    placeholder="2023"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Did you minor in anything?"
                    name={`${selectedEduName}.minor`}
                    placeholder="Philosophy"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="GPA"
                    name={`${selectedEduName}.gpa`}
                    placeholder="3.9"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="Additional Information"
                    name={`${selectedEduName}.additionalInfo`}
                    placeholder="Implemented static code analysis techniques to identify and rectify potential bugs, vulnerabilities, and style violations, ensuring adherence to industry best practices."
                    helperText="Markdown supported"
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Education"
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
