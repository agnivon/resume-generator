import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { useHomePageContext } from "@/context/page/HomePageContextProvider";
import useUpdateResume from "@/hooks/resume/data/useUpdateResume";
import { HomePageActions } from "@/reducers/HomePageReducer";
import { Resume } from "@/types/resume.types";
import { Form, Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Resume Name is required"),
});

export default function EditResumeModal(
  props: ModalProps & { resume: Resume | null }
) {
  const { resume } = props;
  const alert = useAlert();
  const { dispatch } = useHomePageContext();
  const updateResume = useUpdateResume();

  if (!resume) return <></>;

  const initialValues = { name: resume.name };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    formik.setSubmitting(true);
    try {
      const editedResume = { ...resume, ...values };
      await updateResume.mutation.mutateAsync(editedResume);
      dispatch(HomePageActions.setShowEditResumeModal(null));
      alert.success(`Changes saved`);
    } catch {
      alert.error("Something went wrong");
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
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-y-6">
                  <FormikInput name="name" label="Resume Name *" />
                  <Button
                    label="Save changes"
                    type="submit"
                    disabled={!formik.isValid}
                    processing={formik.isSubmitting}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
