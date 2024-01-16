import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/global/Button";
import RenderIf from "@/components/global/RenderIf";
import Spinner, {
  SpinnerColor,
  SpinnerSize,
} from "@/components/global/Spinner";
import Textarea from "@/components/global/forms/Textarea";
import FormikCheckbox from "@/components/global/forms/formik/FormikCheckbox";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { ResumeFormValues } from "@/types/form.types";
import { classNames } from "@/utils";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Cog8ToothIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ResumeV2 } from "@prisma/client";
import { useCompletion } from "ai/react";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import React from "react";

type SummaryGenerationModalProps = ModalProps & {
  resume: ResumeV2;
};

export default function SummaryGenerationModal(
  props: SummaryGenerationModalProps
) {
  const { resume, ...rest } = props;

  const { jobTitle, jobDescription } = resume;

  const parentFormik = useFormikContext<ResumeFormValues>();

  const [view, setView] = React.useState<"form" | "result">("form");

  const completion = useCompletion({
    api: `/api/ai/completion/${resume.id}/summary`,
  });

  const initialValues = {
    jobTitle,
    jobDescription,
    useExperiences: true,
    useSkills: true,
  };

  const handleGenerate = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    helpers.setSubmitting(true);
    setView("result");
    try {
      await completion.complete("", { body: values });
    } catch {}
    helpers.setSubmitting(false);
  };

  const handleCancelOrBack = () => {
    stop();
    setView("form");
  };

  const handleUse = () => {
    parentFormik.setFieldValue("resume.summary", completion.completion);
    rest.onClose?.();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(completion.completion);
    rest.onClose?.();
  };

  return (
    <Modal dismissible={true} {...rest}>
      <Formik initialValues={initialValues} onSubmit={handleGenerate}>
        {(formik) => {
          //formikLogger(formik, "Summary Generation Modal");
          return (
            <Form>
              <ModalHeader>
                <>
                  Summary Writer
                  <div className="text-sm font-normal">
                    Generate a resume summary tailored to the job posting
                  </div>
                </>
              </ModalHeader>
              <ModalBody>
                <div className="w-full md:min-w-[40vw]">
                  <RenderIf isTrue={view === "form"}>
                    <MotionDiv>
                      <div>
                        <FormikInput
                          name="jobTitle"
                          label="Job Title"
                          placeholder={SAMPLE_JOB_DESCRIPTION.job.title}
                        />
                      </div>
                      <div>
                        <FormikTextArea
                          name="jobDescription"
                          label="Job Description"
                          placeholder={SAMPLE_JOB_DESCRIPTION.job.description}
                        />
                      </div>
                      <div className="flex gap-x-4">
                        <FormikCheckbox
                          name="useExperiences"
                          label="Use Experiences"
                          showSubText={false}
                        />
                        <FormikCheckbox
                          name="useSkills"
                          label="Use Skills"
                          showSubText={false}
                        />
                      </div>
                      <div className="mt-6">
                        <Button
                          label="Generate"
                          //type="submit"
                          variant={ButtonVariant.GRADIENT_DUO}
                          color={ButtonColor.GREEN_TO_BLUE}
                          disabled={!formik.isValid}
                          //processing={formik.isSubmitting}
                          customClassNames="w-full"
                          size={ButtonSize.BASE}
                          Icon={Cog8ToothIcon}
                          onClick={() => formik.submitForm()}
                        />
                      </div>
                    </MotionDiv>
                  </RenderIf>
                  <RenderIf isTrue={view === "result"}>
                    <MotionDiv>
                      <div>
                        <div className="p-2 shadow-sm dark:shadow-sm-light flex justify-between items-center border border-b-0 rounded-lg rounded-b-none border-gray-300 dark:border-gray-600">
                          <div className="text-sm">
                            {completion.isLoading ? (
                              <div className="flex gap-x-2 items-center pl-1">
                                <Spinner
                                  size={SpinnerSize.SMALL}
                                  color={SpinnerColor.GRAY}
                                />
                                <span>Generating...</span>
                              </div>
                            ) : (
                              `${completion.completion.length} characters`
                            )}
                          </div>
                          <div
                            className={classNames(
                              "flex justify-end gap-x-2",
                              completion.isLoading ? "invisible" : ""
                            )}
                          >
                            <Button
                              label="Use"
                              variant={ButtonVariant.DEFAULT}
                              color={ButtonColor.BLUE}
                              //disabled={formik.isSubmitting || isLoading}
                              //processing={formik.isSubmitting || isLoading}
                              customClassNames="w-12"
                              //Icon={ArrowUpOnSquareIcon}
                              //customIconClassNames="w-2 h-2"
                              size={ButtonSize.EXTRA_SMALL}
                              onClick={handleUse}
                            />
                            <Button
                              label="Copy"
                              variant={ButtonVariant.DEFAULT}
                              color={ButtonColor.LIGHT}
                              //disabled={formik.isSubmitting || isLoading}
                              customClassNames="w-12"
                              //Icon={ClipboardDocumentIcon}
                              //customIconClassNames="w-2 h-2"
                              size={ButtonSize.EXTRA_SMALL}
                              onClick={handleCopy}
                            />
                          </div>
                        </div>
                        <div>
                          <Textarea
                            value={completion.completion}
                            readOnly={completion.isLoading}
                            onChange={(e) =>
                              completion.setCompletion(e.target.value)
                            }
                            errorText={completion.error?.message}
                            rows={10}
                            showSubText={Boolean(completion.error)}
                            textAreaClassNames="rounded-t-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-x-4 mt-6">
                        <Button
                          label={completion.isLoading ? "Cancel" : "Back"}
                          variant={ButtonVariant.DEFAULT}
                          color={ButtonColor.ALT}
                          customClassNames="w-full"
                          Icon={
                            completion.isLoading ? XCircleIcon : ChevronLeftIcon
                          }
                          size={ButtonSize.BASE}
                          onClick={handleCancelOrBack}
                        />
                        <Button
                          label="Re-Generate"
                          variant={ButtonVariant.GRADIENT_DUO}
                          color={ButtonColor.GREEN_TO_BLUE}
                          disabled={formik.isSubmitting || completion.isLoading}
                          //processing={formik.isSubmitting || isLoading}
                          customClassNames="w-full"
                          Icon={ArrowPathIcon}
                          size={ButtonSize.BASE}
                          onClick={() => handleGenerate(formik.values, formik)}
                        />
                      </div>
                    </MotionDiv>
                  </RenderIf>
                </div>
              </ModalBody>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
