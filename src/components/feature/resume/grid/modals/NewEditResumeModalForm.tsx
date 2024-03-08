import Badge, { BadgeColor } from "@/components/global/Badge";
import Button from "@/components/global/Button";
import Label from "@/components/global/forms/Label";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import FormikTextArea from "@/components/global/forms/formik/FormikTextArea";
import { SAMPLE_JOB_DESCRIPTION } from "@/constants/form.constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ResumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { Form, useFormikContext } from "formik";
import { InferType } from "yup";
import NewTag from "../../tags/NewTag";
import SelectTag from "../../tags/SelectTag";
import { TooltipCustomTheme } from "@/constants/flowbite.constants";
import { ResumeTag } from "@prisma/client";
import { produce } from "immer";
import FormikCharactersRemaining from "@/components/global/forms/formik/FormikCharactersRemaining";
import { JOB_DESCRIPTION } from "@/constants/schema.constants";

export default function NewEditResumeModalForm({
  type,
}: {
  type: "create" | "edit";
}) {
  const formik = useFormikContext<InferType<typeof ResumeMetadataFormSchema>>();
  const resumeTagEntities = useAppSelector(
    (state) => state.resume.tags.entities
  );

  const handleRemove = (id: string) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((tid) => tid !== id)
    );
  };

  const handleTagCreation = (tag: ResumeTag) => {
    formik.setFieldValue(
      "tags",
      produce(formik.values.tags, (draft) => {
        draft.unshift(tag.id);
      })
    );
  };

  return (
    <Form>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-x-4">
        <div className="col-span-1">
          <FormikInput
            name="name"
            label="Resume Name *"
            placeholder="Emily Thompson"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            name="domain"
            label="Domain"
            placeholder="Software Engineering"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            name="experienceLevel"
            label="Experience Level"
            placeholder="Mid-Senior Level"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            name="companyName"
            label="Company Name"
            placeholder={SAMPLE_JOB_DESCRIPTION.company.name}
          />
        </div>
        <div className="cols-span-1 sm:col-span-2 mb-5 min-h-16">
          <Label label="Tags" />
          <div className="flex gap-2 flex-wrap items-center">
            <SelectTag />
            <NewTag
              tooltipTheme={TooltipCustomTheme}
              onCreated={handleTagCreation}
            />
            {formik.values.tags.map((id) => {
              const tag = resumeTagEntities[id];
              return tag ? (
                <Badge
                  key={tag.id}
                  color={tag.color as BadgeColor}
                  customClassNames="h-7 justify-center"
                >
                  <span>{tag.name}</span>
                  <button
                    type="button"
                    className="rounded-full"
                    onClick={() => handleRemove(tag.id)}
                    //disabled={globalRunning}
                  >
                    <MinusCircleIcon className="h-4 w-4 text-red-500 hover:animate-pulse" />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
        </div>
        <div className="cols-span-1 sm:col-span-2">
          <FormikInput
            name="jobTitle"
            label="Job Title"
            placeholder={SAMPLE_JOB_DESCRIPTION.job.title}
          />
        </div>
        <div className="cols-span-1 sm:col-span-2">
          <FormikTextArea
            name="jobDescription"
            label="Job Description"
            placeholder={SAMPLE_JOB_DESCRIPTION.job.description}
            textAreaClassNames="max-h-[20vh]"
            helperText={<FormikCharactersRemaining name={"jobDescription"} limit={JOB_DESCRIPTION} />}
            />
        </div>
        <div className="cols-span-1 sm:col-span-2 mt-4">
          <Button
            label={type === "create" ? "Create new resume" : "Save Changes"}
            type="submit"
            disabled={!formik.isValid}
            processing={formik.isSubmitting}
            customClassNames="w-full"
          />
        </div>
      </div>
    </Form>
  );
}
