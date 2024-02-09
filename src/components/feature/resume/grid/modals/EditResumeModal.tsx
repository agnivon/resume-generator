import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import useUpdateResumeV2ById from "@/hooks/resume/data/v2/useUpdateResumeV2ById";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { getToastErrMessage } from "@/utils/form.utils";
import { resumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { ResumeV2 } from "@prisma/client";
import { Form, Formik, FormikHelpers } from "formik";
import { useAlert } from "react-alert";
import * as Yup from "yup";

const validationSchema = Yup.object().shape(resumeMetadataFormSchema);

export default function EditResumeModal(
  props: ModalProps & { resume: ResumeV2 | null }
) {
  const { resume } = props;
  const alert = useAlert();
  const { dispatch } = useResumesPageContext();
  const updateResume = useUpdateResumeV2ById();

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
      await updateResume.mutation.mutateAsync({
        id: resume.id,
        resume: values,
      });
      dispatch(ResumesPageActions.setShowEditResumeModal(null));
      alert.success(`Changes saved`);
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
                  <div className="col-span-2 mt-2">
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
