import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import {
  NEW_CUSTOM_SECTION,
  NEW_SKILL_V2,
} from "@/constants/resume.v2.constants";
import { SKILL_LENGTH } from "@/constants/schema.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { getTextAreaRows } from "@/utils/form.utils";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import DescriptionHelperText from "./DescriptionHelperText";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import FormikInput from "@/components/global/forms/formik/FormikInput";

export default function CustomSectionsForm() {
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
    handleAddNewItem,
    handleDeleteItem,
    handleListItemClicked,
    handleUnsavedListItemChange,
    getListItemContent,
    handleSequenceChange,
    getDraggableListItemContent,
  } = useFormListManager(
    formik,
    "customSections",
    "customSection",
    NEW_CUSTOM_SECTION
  );

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const listItems = (
    formik.values.resume.customSections.map((section, idx) => {
      return {
        label: section.name,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {section.name || "Some Name"}
            </div>
            <div className="text-sm line-clamp-2">
              {section.content || "Some Content"}
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
      label: "Add new section",
      content: <>{"Add new section"}</>,
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
        items={formik.values.resume.customSections}
        idExtractor={(section) => section.name}
        itemRenderer={(section) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">
                {section.name || "Some Section"}
              </div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%]">
            <div className="text-lg mb-2 font-bold">Custom Sections</div>
            <ListGroup items={listItems} />
            <Button
              label="Change sequence"
              onClick={() => setShowListSequenceChangeModal(true)}
              color={ButtonColor.ALT}
              size={ButtonSize.SMALL}
              customClassNames="mt-4 w-full"
            />
          </div>
          <div className="w-full md:w-[70%] grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doEntitiesExist}>
              <div className="col-span-2 text-center dark:text-gray-400 text-gray-600">
                {`To add a section click on "Add new section" on the left panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doEntitiesExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select a section from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="Enter section name *"
                    name={`${selectedEntityName}.name`}
                    placeholder="Languages"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="Enter content *"
                    name={`${selectedEntityName}.content`}
                    placeholder="Hindi, English, Kannada, French, Spanish, Japanese"
                    helperText={
                      <DescriptionHelperText
                        text={"Markdown supported"}
                        name={`${selectedEntityName}.content`}
                        limit={2000}
                      />
                    }
                    rows={getTextAreaRows(selectedEntity?.content)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Custom Sections"
                    type="submit"
                    //disabled=\{!formik\.isValid\}
                    processing={formik.isSubmitting}
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
