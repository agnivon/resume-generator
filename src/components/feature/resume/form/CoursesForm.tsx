import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { NEW_COURSE_V2 } from "@/constants/resume.v2.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import DescriptionHelperText from "./DescriptionHelperText";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";

export default function CoursesForm() {
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
  } = useFormListManager(formik, "courses", "course", NEW_COURSE_V2);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const listItems = (
    formik.values.resume.courses.map((course, idx) => {
      return {
        label: course.name,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {course.name || "Some Name"}
            </div>
            <div className="text-sm line-clamp-2">
              {course.institution || "Some Institution"}
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
      label: "Add new course",
      content: <>{"Add new course"}</>,
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
        items={formik.values.resume.courses}
        idExtractor={(course) => course.name}
        itemRenderer={(course) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{course.name || "Some Title"}</div>
              <div className="text-sm">
                {course.institution || "Some Institution"}
              </div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%]">
            <div className="text-lg mb-2 font-bold">Your Courses</div>
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
          <div className="w-full md:w-[70%] grid grid-cols-2 items-start gap-x-8 gap-y-2">
            <RenderIf isTrue={!doEntitiesExist}>
              <div className="col-span-2 text-center dark:text-gray-400 text-gray-600">
                {`To add a course click on "Add new course" on the left panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doEntitiesExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select a course from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="What was the name of your course? *"
                    name={`${selectedEntityName}.name`}
                    placeholder="Introduction to Blockchain"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where did you take your course? *"
                    name={`${selectedEntityName}.institution`}
                    placeholder="NPTEL"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="When did you take your course? *"
                    name={`${selectedEntityName}.year`}
                    placeholder="2023"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="What skill did you use?"
                    name={`${selectedEntityName}.skills`}
                    placeholder="Blockchain Design"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="How was that skill applied?"
                    name={`${selectedEntityName}.applications`}
                    placeholder="Created Bitcoin V2"
                    helperText={
                      <DescriptionHelperText
                        text={"Markdown supported"}
                        name={`${selectedEntityName}.applications`}
                      />
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Courses"
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
