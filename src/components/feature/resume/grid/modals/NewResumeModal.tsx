import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { NEW_RESUME_V2, NEW_CONTACT_V2 } from "@/constants/resume.v2.constants";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useNextAuthSession from "@/hooks/auth/useNextAuthSession";
import useInsertResumeV2 from "@/hooks/resume/data/v2/useInsertResumeV2";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { Form, Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Resume Name is required"),
});

export default function NewResumeModal(props: ModalProps) {
  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const { session } = useNextAuthSession();

  const insertResume = useInsertResumeV2();
  const initialValues = {
    name: "",
    domain: "",
    experienceLevel: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    formik: FormikHelpers<typeof initialValues>
  ) => {
    formik.setSubmitting(true);
    try {
      if (session?.user?.id) {
        const newResume = NEW_RESUME_V2({
          name: values.name,
          userId: session?.user?.id,
          contact: NEW_CONTACT_V2({}),
        });
        await insertResume.mutation.mutateAsync(newResume);
        dispatch(ResumesPageActions.setShowNewResumeModal(false));
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
                <div className="grid grid-cols-2 items-start gap-x-4">
                  <FormikInput
                    name="name"
                    label="Resume Name *"
                    placeholder="Emily Thompson"
                  />
                  <FormikInput
                    name="domain"
                    label="Domain"
                    placeholder="Software Engineering"
                  />
                  <FormikInput
                    name="experienceLevel"
                    label="Experience Level"
                    placeholder="Mid-Senior Level"
                  />
                  <FormikInput
                    name="companyName"
                    label="Company Name"
                    placeholder={SAMPLE_JOB_DESCRIPTION.company.name}
                  />
                  <div className="col-span-2">
                    <FormikInput
                      name="jobTitle"
                      label="Job Title"
                      placeholder={SAMPLE_JOB_DESCRIPTION.job.title}
                    />
                  </div>
                  <div className="col-span-2">
                    <FormikTextArea
                      name="jobDescription"
                      label="Job Description"
                      placeholder={SAMPLE_JOB_DESCRIPTION.job.description}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      label="Create new resume"
                      type="submit"
                      disabled={!formik.isValid}
                      processing={formik.isSubmitting}
                      customClassNames="w-full"
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}
