import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/global/Button";
import Card from "@/components/global/Card";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import OpenAIIcon from "@/components/global/icons/OpenAIIcon";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { SUMMARY_TIPS } from "@/constants/tips.constants";
import { ResumeFormValues } from "@/types/form.types";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import { useFormikContext } from "formik";
import React from "react";
import SummaryGenerationModal from "../../ai/summary/SummaryGenerationModal";
import ResumeTipsCard from "../tips/ResumeTipsCard";
import { useAuthLayoutContext } from "@/context/layout/AuthLayoutContextProvider";

export default function SummaryForm() {
  const formik = useFormikContext<ResumeFormValues>();
  const { userDetails } = useAuthLayoutContext();

  const isUserPremium = userDetails.membership?.premium;

  //const alert = useAlert();

  //const upsertResume = useUpsertCompleteResume();

  const [showSummaryGeneratorModal, setShowSummaryGeneratorModal] =
    React.useState<boolean>(false);

  //const isFormValid = !Boolean(formik.errors?.resume?.summary);

  /* const handleSaveSummaryForm = async () => {
    validateFormikForm(
      formik,
      async () => {
        try {
          const resume = formik.values.resume;
          await upsertResume.mutation.mutateAsync({
            id: resume.id,
            name: resume.name,
            userId: resume.userId,
            summary: resume.summary,
          });
          alert.success("Details saved");
        } catch {
          alert.error("Something went wrong");
        }
      },
      () => {
        formik.setTouched(getFormikTouchedObject(formik.values));
        alert.error(FORM_INVALID_MESSAGE);
      }
    );
  }; */

  return (
    <>
      {isUserPremium && (
        <SummaryGenerationModal
          resume={formik.values.resume}
          show={showSummaryGeneratorModal}
          onClose={() => setShowSummaryGeneratorModal(false)}
        />
      )}
      <MotionDiv>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="grid grid-cols-2 items-start gap-x-8 gap-y-2 w-full md:w-[70%]">
            <div className="col-span-2">
              <div className="text-lg mb-1 font-bold">Professional Summary</div>
            </div>
            <div className="col-span-2">
              <div className="mb-2">
                {`A resume summary is a concise statement at the beginning of your
            resume that highlights your key qualifications and career goals.
            It's usually the first section a potential employer reads, so it's
            important to make it compelling.`}
              </div>
            </div>
            <div className="col-span-2">
              <FormikTextArea
                label="Write a professional summary *"
                name={`resume.summary`}
                placeholder="Dedicated and results-driven Software Engineer with over five years of experience in full-stack web development and a proven track record of delivering high-quality software solutions."
              />
            </div>
            <div className="col-span-2">
              <Button
                label="Save Summary"
                type="submit"
                //disabled=\{!formik\.isValid\}
                processing={formik.isSubmitting}
                customClassNames="w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-[30%] space-y-4">
            {isUserPremium && (
              <Card customClassNames="!p-4 space-y-4">
                <div className="flex gap-x-2 items-center">
                  <OpenAIIcon className="h-5 w-5 fill-gray-600 dark:fill-white" />
                  <span className="font-bold">GPT Summary Writer</span>
                </div>
                <div className="text-sm">
                  GPT Summary Writer generates a resume summary based on details
                  entered about the resume and in the sections
                </div>
                <Button
                  label="Generate"
                  customClassNames="w-full"
                  size={ButtonSize.SMALL}
                  variant={ButtonVariant.GRADIENT_DUO}
                  color={ButtonColor.GREEN_TO_BLUE}
                  Icon={Cog8ToothIcon}
                  customIconClassNames="!h-4 !w-4"
                  onClick={() => setShowSummaryGeneratorModal(true)}
                />
              </Card>
            )}
            <ResumeTipsCard tips={SUMMARY_TIPS} />
          </div>
        </div>
      </MotionDiv>
    </>
  );
}
