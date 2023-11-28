import Modal, { ModalProps, ModalSize } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { TemplateSize, TemplateType } from "@/constants/template.constants";
import { TemplateCard } from "./ResumeTemplateDrawer";
import ResumeTemplate from "../template/ResumeTemplate";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { useFormikContext } from "formik";
import { ResumePreviewSettings } from "@/types/template.types";

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
          className="flex items-start gap-x-6"
          onScroll={(e) => e.preventDefault()}
        >
          <div className="h-[80vh] hide-scrollbar overflow-y-auto">
            <div className="grid grid-cols-2 gap-5">
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
          <div className="overflow-y-auto p-6 rounded-lg h-[80vh] hide-scrollbar border dark:border-gray-600 max-xl:hidden">
            <ResumeTemplate resume={value.resume} {...values.previewSettings} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
