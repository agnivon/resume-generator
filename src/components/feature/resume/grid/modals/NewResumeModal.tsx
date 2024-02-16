import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { NEW_CONTACT_V2, NEW_RESUME_V2 } from "@/constants/resume.v2.constants";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useNextAuthSession from "@/hooks/auth/useNextAuthSession";
import useInsertResumeV2 from "@/hooks/resume/data/v2/useInsertResumeV2";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import { ResumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { Form, Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import NewEditResumeModalForm from "./NewEditResumeModalForm";
import { InferType } from "yup";

const validationSchema = ResumeMetadataFormSchema;
export default function NewResumeModal(props: ModalProps) {
  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const { session } = useNextAuthSession();

  const insertResume = useInsertResumeV2();
  const initialValues: InferType<typeof ResumeMetadataFormSchema> = {
    name: "",
    domain: "",
    experienceLevel: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    tags: [],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    formik.setSubmitting(true);
    try {
      if (session?.user?.id) {
        const newResume = NEW_RESUME_V2({
          ...values,
          userId: session?.user?.id,
          contact: NEW_CONTACT_V2({}),
        });
        await insertResume.mutation.mutateAsync(newResume);
        dispatch(ResumesPageActions.setShowNewResumeModal(false));
        alert.success(`${values.name} created`);
      }
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
    formik.setSubmitting(false);
  };
  return (
    <Modal dismissible={true} {...props}>
      <ModalHeader>New Resume</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount={true}
        >
          {() => {
            return <NewEditResumeModalForm type="create" />;
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
