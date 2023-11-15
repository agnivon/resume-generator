import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import Modal, { ModalProps, ModalSize } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { DOMAttributes } from "react";

type ConfirmationModalProps = ModalProps & {
  message: string;
  onConfirm: DOMAttributes<HTMLButtonElement>["onClick"];
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal dismissible={true} popup={true} size={ModalSize.SMALL} {...props}>
      <ModalHeader />
      <ModalBody>
        <div>
          <ExclamationCircleIcon className="mx-auto mb-2 text-gray-400 w-20 h-20 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
            {props.message}
          </h3>
          <div className="flex gap-x-2 justify-center">
            <Button
              label="Yes I'm sure"
              color={ButtonColor.RED}
              onClick={props.onConfirm}
              size={ButtonSize.SMALL}
            />
            <Button
              label="No, cancel"
              color={ButtonColor.ALT}
              onClick={props.onClose}
              size={ButtonSize.SMALL}
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
