import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { NEW_SKILL_V2 } from "@/constants/resume.v2.constants";
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

export default function SkillsForm() {
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
  } = useFormListManager(formik, "skills", "skill", NEW_SKILL_V2);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const listItems = (
    formik.values.resume.skills.map((skill, idx) => {
      return {
        label: skill.skill,
        content: getListItemContent(
          <>
            <div className="line-clamp-3">{skill.skill || "Some Skill"}</div>
          </>,
          idx
        ),
        onClick: () => handleListItemClicked(idx),
        selected: selectedItemIdx === idx,
      };
    }) as ListItem[]
  ).concat([
    {
      label: "Add new skill",
      content: <>{"Add new skill"}</>,
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
        items={formik.values.resume.skills}
        idExtractor={(skill) => skill.skill}
        itemRenderer={(skill) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{skill.skill || "Some Skill"}</div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%]">
            <div className="text-lg mb-2 font-bold">Your Skills</div>
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
                {`To add a skill click on "Add new skill" on the left panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doEntitiesExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select a skill from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikTextArea
                    label="Enter your skills *"
                    name={`${selectedEntityName}.skill`}
                    placeholder="HTML, CSS, Javascript"
                    helperText={
                      <DescriptionHelperText
                        text={"Markdown supported"}
                        name={`${selectedEntityName}.skill`}
                        limit={SKILL_LENGTH}
                      />
                    }
                    rows={getTextAreaRows(selectedEntity?.skill)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Skills"
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
