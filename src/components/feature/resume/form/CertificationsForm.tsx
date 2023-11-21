import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import ListGroup, { ListItem } from "@/components/global/ListGroup";
import RenderIf from "@/components/global/RenderIf";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import { NEW_CERTIFICATION } from "@/constants/resume.constants";
import useFormListManager from "@/hooks/resume/form/useFormListManager";
import { ResumeFormValues } from "@/types/form.types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormikContext } from "formik";
import _ from "lodash";
import ConfirmationModal from "./modals/ConfirmationModal";
import React from "react";
import ListItemSequenceChangeModal from "./modals/ListItemSequenceChangeModal";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";

export default function CertificationsForm() {
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
  } = useFormListManager(
    formik,
    "certifications",
    "certification",
    NEW_CERTIFICATION
  );

  const [showListSequenceChangeModal, setShowListSequenceChangeModal] =
    React.useState<boolean>(false);

  const doCertificationsExist = formik.values.resume.certifications.length > 0;

  const selectedCertName = `resume.certifications.${selectedItemIdx}`;

  const listItems = (
    formik.values.resume.certifications.map((cert, idx) => {
      return {
        label: cert.name,
        content: getListItemContent(
          <>
            <div className="font-semibold line-clamp-2">
              {cert.name || "Some Name"}
            </div>
            <div className="text-sm line-clamp-2">
              {cert.institution || "Some Institution"}
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
      label: "Add new certification",
      content: <>{"Add new certification"}</>,
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
        items={formik.values.resume.certifications}
        idExtractor={(cert) => cert.name}
        itemRenderer={(cert) =>
          getDraggableListItemContent(
            <>
              <div className="font-semibold">{cert.name || "Some Title"}</div>
              <div className="text-sm">
                {cert.institution || "Some Institution"}
              </div>
            </>
          )
        }
        onDragEnd={handleSequenceChange}
      />
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/4">
            <div className="text-lg mb-2 font-bold">Your Certifications</div>
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
            <RenderIf isTrue={!doCertificationsExist}>
              <div className="col-span-2 text-center dark:text-white text-gray-600">
                {`To add a certification click on "Add new
                certification" on the left panel`}
              </div>
            </RenderIf>
            <RenderIf isTrue={doCertificationsExist}>
              <RenderIf isTrue={selectedItemIdx === null}>
                <div className="col-span-2 text-center">
                  Select a certification from the side panel to view and edit
                  the details
                </div>
              </RenderIf>
              <RenderIf isTrue={selectedItemIdx !== null}>
                <div className="col-span-2">
                  <FormikInput
                    label="What was the name of your certification? *"
                    name={`${selectedCertName}.name`}
                    placeholder="AWS Cloud Practitioner"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="Where did you get your certificate? *"
                    name={`${selectedCertName}.institution`}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div className="col-span-2">
                  <FormikInput
                    label="When did you get your certificate? *"
                    name={`${selectedCertName}.year`}
                    placeholder="2023"
                  />
                </div>
                <div className="col-span-2">
                  <FormikTextArea
                    label="How is the certificate relevant?"
                    name={`${selectedCertName}.relevance`}
                    placeholder="Certified in all popular cloud services"
                    helperText="Markdown supported"
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    label="Save Certifications"
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
