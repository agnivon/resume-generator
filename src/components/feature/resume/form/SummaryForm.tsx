import Button from "@/components/global/Button";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { FORM_INVALID_MESSAGE } from "@/constants/form.constants";
import { SUMMARY_TIPS } from "@/constants/tips.constants";
import useUpsertCompleteResume from "@/hooks/resume/data/useUpsertCompleteResume";
import { ResumeFormValues } from "@/types/form.types";
import { getFormikTouchedObject, validateFormikForm } from "@/utils/form.utils";
import { useFormikContext } from "formik";
import { useAlert } from "react-alert";
import ResumeTipsCard from "../tips/ResumeTipsCard";

export default function SummaryForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const alert = useAlert();

  const upsertResume = useUpsertCompleteResume();

  //const isFormValid = !Boolean(formik.errors?.resume?.summary);

  const handleSaveSummaryForm = async () => {
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
  };

  return (
    <MotionDiv>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-2 w-full md:w-3/4">
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
              type="button"
              //disabled={!isFormValid}
              processing={formik.isSubmitting || upsertResume.isPending}
              customClassNames="w-full"
              onClick={handleSaveSummaryForm}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4 space-y-4">
          <ResumeTipsCard tips={SUMMARY_TIPS} />
        </div>
      </div>
    </MotionDiv>
  );
}
