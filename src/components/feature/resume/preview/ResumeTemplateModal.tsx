import Modal, { ModalProps, ModalSize } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { TemplateType } from "@/constants/template.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumePreviewSettings } from "@/types/template.types";
import { useFormikContext } from "formik";
import ResumeTemplate from "../template/ResumeTemplate";
import { TemplateCard } from "./TemplateCard";

const RESUME_TEMPLATES = [
  TemplateType.STANDARD,
  TemplateType.BOLD,
  TemplateType.MODERN,
];

type ResumeTemplateModalProps = ModalProps;

export default function ResumeTemplateModal(props: ResumeTemplateModalProps) {
  const { value } = useResumePageContext();
  const { values } = useFormikContext<{
    previewSettings: ResumePreviewSettings;
  }>();

  return (
    <Modal dismissible={true} size={ModalSize.EXTRA_LARGE} {...props}>
      <ModalHeader>Choose a template</ModalHeader>
      <ModalBody>
        <div
          className="flex flex-col items-center gap-x-6"
          onScroll={(e) => e.preventDefault()}
        >
          <div className="max-h-[80vh] hide-scrollbar overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {RESUME_TEMPLATES.map((template) => {
                return (
                  <TemplateCard
                    template={template}
                    key={template}
                    sizeClass="a9"
                    thumbnailScale={0.172}
                  />
                );
              })}
            </div>
          </div>
          {/* <div className="overflow-y-auto p-6 rounded-lg h-[80vh] hide-scrollbar border dark:border-gray-600 max-xl:hidden">
            <ResumeTemplate resume={value.resume} {...values.previewSettings} />
          </div> */}
        </div>
      </ModalBody>
    </Modal>
  );
}
