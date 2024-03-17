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
import Accordion from "@/components/global/accordion/Accordion";
import Textarea from "@/components/global/forms/Textarea";
import FormikCharactersRemaining from "@/components/global/forms/formik/FormikCharactersRemaining";
import FormikCheckbox from "@/components/global/forms/formik/FormikCheckbox";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import Modal, { ModalProps, ModalSize } from "@/components/global/modal/Modal";
import ModalBody from "@/components/global/modal/ModalBody";
import ModalHeader from "@/components/global/modal/ModalHeader";
import MotionDiv from "@/components/global/motion/MotionDiv";
import UnderlineTabs from "@/components/global/tabs/UnderlineTabs";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { GPTGenerationType } from "@/constants/generation.constants";
import { JOB_DESCRIPTION } from "@/constants/schema.constants";
import useGetGPTGenerations from "@/hooks/resume/data/useGetGPTGenerations";
import { ResumeFormValues } from "@/types/form.types";
import { classNames } from "@/utils";
import { resumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { ArrowPathIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import {
  ArrowUpOnSquareIcon,
  ClipboardDocumentIcon,
  Cog8ToothIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ResumeV2 } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useCompletion } from "ai/react";
import { Tooltip } from "flowbite-react";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import * as Yup from "yup";

type SummaryGenerationModalProps = ModalProps & {
  resume: ResumeV2;
};

const validationSchema = Yup.object().shape({
  jobTitle: resumeMetadataFormSchema.jobTitle,
  jobDescription: resumeMetadataFormSchema.jobDescription,
});

export default function SummaryGenerationModal(
  props: SummaryGenerationModalProps
) {
  const { resume, ...rest } = props;

  const { jobTitle, jobDescription } = resume;

  const parentFormik = useFormikContext<ResumeFormValues>();

  const queryClient = useQueryClient();

  const [view, setView] = React.useState<"form" | "result">("form");

  const [tab, setTab] = React.useState<"generate" | "previous-generations">(
    "generate"
  );

  const [openAccordion, setOpenAccordion] = React.useState<string>("");

  const alert = useAlert();

  const { query: previousGenerationsQuery } = useGetGPTGenerations(
    resume.id,
    GPTGenerationType.SUMMARY
  );

  const completion = useCompletion({
    api: `/api/ai/completion/${resume.id}/summary`,
  });

  const tabs = [
    {
      label: "Generate",
      onClick: () => setTab("generate"),
      current: tab === "generate",
    },
    {
      label: "Previous Generations",
      onClick: () => setTab("previous-generations"),
      current: tab === "previous-generations",
      loading: previousGenerationsQuery.isLoading,
    },
  ];

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
      previousGenerationsQuery.refetch();
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert.success("Copied to clipboard");
    //rest.onClose?.();
  };

  return (
    <Modal dismissible={true} size={ModalSize.EXTRA_LARGE} {...rest}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleGenerate}
        validationSchema={validationSchema}
      >
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
                <div className="w-full md:w-[40vw] md:min-h-[46vh]">
                  <div className="-mt-2 mb-6">
                    <UnderlineTabs tabs={tabs} tabClassNames="!p-2 !px-3" />
                  </div>
                  <RenderIf isTrue={tab === "generate"}>
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
                            helperText={
                              <FormikCharactersRemaining
                                name={"jobDescription"}
                                limit={JOB_DESCRIPTION}
                              />
                            }
                          />
                        </div>
                        <div className="flex gap-x-4 mt-3">
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
                            <div className="text-sm pl-1">
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
                                customClassNames="w-20 h-8"
                                Icon={ArrowUpOnSquareIcon}
                                customIconClassNames="w-3 h-3 !mr-1"
                                size={ButtonSize.SMALL}
                                onClick={handleUse}
                              />
                              <Button
                                label="Copy"
                                variant={ButtonVariant.DEFAULT}
                                color={ButtonColor.LIGHT}
                                //disabled={formik.isSubmitting || isLoading}
                                customClassNames="w-20 h-8"
                                Icon={ClipboardDocumentIcon}
                                customIconClassNames="w-3 h-3 !mr-1"
                                size={ButtonSize.SMALL}
                                onClick={() =>
                                  handleCopy(completion.completion)
                                }
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
                              completion.isLoading
                                ? XCircleIcon
                                : ChevronLeftIcon
                            }
                            size={ButtonSize.BASE}
                            onClick={handleCancelOrBack}
                          />
                          <Button
                            label="Re-Generate"
                            variant={ButtonVariant.GRADIENT_DUO}
                            color={ButtonColor.GREEN_TO_BLUE}
                            disabled={
                              formik.isSubmitting || completion.isLoading
                            }
                            //processing={formik.isSubmitting || isLoading}
                            customClassNames="w-full"
                            Icon={ArrowPathIcon}
                            size={ButtonSize.BASE}
                            onClick={() =>
                              handleGenerate(formik.values, formik)
                            }
                          />
                        </div>
                      </MotionDiv>
                    </RenderIf>
                  </RenderIf>
                  <RenderIf isTrue={tab === "previous-generations"}>
                    <MotionDiv className="p-2">
                      {previousGenerationsQuery.data?.map(
                        (generation, idx, arr) => {
                          return (
                            <Accordion
                              key={generation.id}
                              show={openAccordion === generation.id}
                              setShow={(show) => {
                                if (show) setOpenAccordion(generation.id);
                                else setOpenAccordion("");
                              }}
                              heading={
                                <span className="inline-flex gap-2 items-center justify-between w-full">
                                  <span className="font-semibold">{`Summary Generation ${
                                    arr.length - idx
                                  }`}</span>
                                  <Tooltip
                                    style={"dark"}
                                    content={"Copy"}
                                    trigger="hover"
                                  >
                                    <ClipboardDocumentIcon
                                      className="h-5 w-5"
                                      onClick={(e) => {
                                        handleCopy(generation.content);
                                        e.stopPropagation();
                                      }}
                                    />
                                  </Tooltip>
                                </span>
                              }
                              headingClassNames="focus:!ring-0 dark:!border-gray-600 !py-3"
                              content={
                                <>
                                  <p>{generation.content}</p>
                                </>
                              }
                            />
                          );
                        }
                      )}
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
