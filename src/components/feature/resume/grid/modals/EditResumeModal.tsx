import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useUpdateResumeV2ById from "@/hooks/resume/data/v2/useUpdateResumeV2ById";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import { ResumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { ResumeV2 } from "@prisma/client";
import { Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import { InferType } from "yup";
import NewEditResumeModalForm from "./NewEditResumeModalForm";

const validationSchema = ResumeMetadataFormSchema;

export default function EditResumeModal(
  props: ModalProps & { resume: ResumeV2 | null }
) {
  const { resume } = props;
  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const updateResume = useUpdateResumeV2ById();

  //if (!resume) return <></>;

  const initialValues: InferType<typeof ResumeMetadataFormSchema> = {
    name: resume?.name || "",
    domain: resume?.domain || "",
    experienceLevel: resume?.experienceLevel || "",
    jobTitle: resume?.jobTitle || "",
    companyName: resume?.companyName || "",
    jobDescription: resume?.jobDescription || "",
    tags: resume?.tags || [],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    formik.setSubmitting(true);
    try {
      if (resume) {
        await updateResume.mutation.mutateAsync({
          id: resume.id,
          resume: values,
        });
        dispatch(ResumesPageActions.setShowEditResumeModal(null));
        alert.success(`Changes saved`);
      }
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
    formik.setSubmitting(false);
  };
  return (
    <Modal dismissible={true} {...props}>
      <ModalHeader>Edit Resume</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount={true}
        >
          {() => {
            return <NewEditResumeModalForm type="edit" />;
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
