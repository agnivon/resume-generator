import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { NEW_CONTACT, NEW_RESUME } from "@/constants/resume.constants";
import { useHomePageContext } from "@/context/HomePageContextProvider";
import useNextAuthSession from "@/hooks/auth/useNextAuthSession";
import useInsertCompleteResume from "@/hooks/resume/data/useInsertCompleteResume";
import { HomePageActions } from "@/reducers/HomePageReducer";
import { Form, Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Resume Name is required"),
});

export default function NewResumeModal(props: ModalProps) {
  const alert = useAlert();
  const { dispatch } = useHomePageContext();
  const { session } = useNextAuthSession();

  const insertResume = useInsertCompleteResume();
  const initialValues = { name: "" };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    formik.setSubmitting(true);
    try {
      if (session?.user?.email) {
        const newResume = NEW_RESUME({
          name: values.name,
          userId: session?.user?.email,
          contact: NEW_CONTACT({}),
        });
        await insertResume.mutation.mutateAsync(newResume);
        dispatch(HomePageActions.setShowNewResumeModal(false));
        alert.success(`${values.name} created`);
      }
    } catch {
      alert.error("Something went wrong");
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
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-y-6">
                  <FormikInput name="name" label="Resume Name *" />
                  <Button
                    label="Create new resume"
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
