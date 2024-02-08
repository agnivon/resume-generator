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
import { NEW_PROJECT_V2 } from "@/constants/resume.v2.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { getTextAreaRows } from "@/utils/form.utils";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import React from "react";
import ConfirmationModal from "./modals/ConfirmationModal";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";

export default function ProjectForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const {
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
  } = useFormListManager(formik, "projects", "project", NEW_PROJECT_V2);

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const doProjectsExist = formik.values.resume.projects.length > 0;

  const selectedProject = _.isNumber(selectedItemIdx)
    ? formik.values.resume.projects[selectedItemIdx]
    : null;

  const selectedProjName = `resume.projects.${selectedItemIdx}`;

  const listItems = (
    formik.values.resume.projects.map((proj, idx) => {
      return {
        label: proj.title,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {proj.title || "Some Title"}
            </div>
            <div className="text-sm line-clamp-2">
              {proj.organization || "Some Org"}
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
      label: "Add new project",
      content: <>{"Add new project"}</>,
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
        items={formik.values.resume.projects}
        idExtractor={(proj) => proj.title}
        itemRenderer={(proj) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{proj.title || "Some Title"}</div>
              <div className="text-sm">{proj.organization || "Some Org"}</div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-[30%]">
            <div className="text-lg mb-2 font-bold">Your Projects</div>
            <ListGroup items={listItems} />
            {doProjectsExist && (
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
            <RenderIf isTrue={!doProjectsExist}>
              <div className="col-span-2 text-center dark:text-gray-400 text-gray-600">
                {`To add a project click on "Add new project" on the left panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doProjectsExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select an project from the side panel to view and edit the
                  details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="Project Title *"
                    name={`${selectedProjName}.title`}
                    placeholder="Automated Code Review System for Enhanced Software Quality Assurance"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="In which organization did you do your project? *"
                    name={`${selectedProjName}.organization`}
                    placeholder="Amazon"
                  />
                </div>
                <div className="col-span-2">
                  <Label label="When did you do your project? *" />
                  <div className="flex items-center gap-x-4">
                    <FormikDatepicker
                      //type="month"
                      name={`${selectedProjName}.startDate`}
                      placeholder="Select Date"
                      format={START_END_DATE_FORMAT}
                    />
                    <FormikDatepicker
                      name={`${selectedProjName}.endDate`}
                      //type="month"
                      placeholder="Select Date"
                      disabled={Boolean(selectedProject?.currentlyWorking)}
                      format={START_END_DATE_FORMAT}
                    />
                    <FormikSwitch
                      name={`${selectedProjName}.currentlyWorking`}
                      label="Currently working on it"
                      containerClassNames="mt-1"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Project URL"
                    name={`${selectedProjName}.url`}
                    placeholder="https://www.resumegenerator.com"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="Project Description"
                    name={`${selectedProjName}.description`}
                    placeholder="Implemented static code analysis techniques to identify and rectify potential bugs, vulnerabilities, and style violations, ensuring adherence to industry best practices."
                    helperText="Markdown supported"
                    rows={getTextAreaRows(selectedProject?.description)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Projects"
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
