import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
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

  const initialValues = {
    name: resume.name,
    domain: resume.domain,
    experienceLevel: resume.experienceLevel,
    jobTitle: resume.jobTitle,
    companyName: resume.companyName,
    jobDescription: resume.jobDescription,
  };

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
                      label="Save changes"
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
