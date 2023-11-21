import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { FORM_INVALID_MESSAGE } from "@/constants/form.constants";
import useUpsertContact from "@/hooks/resume/data/useUpsertContact";
import { ResumeFormValues } from "@/types/form.types";
import { getFormikTouchedObject, validateFormikForm } from "@/utils/form.utils";
import { FormikErrors, useFormikContext } from "formik";
import { useAlert } from "react-alert";

export default function ContactForm() {
  const formik = useFormikContext<ResumeFormValues>();

  const alert = useAlert();

  const upsertContact = useUpsertContact();

  const handleSaveContactForm = async () => {
    validateFormikForm(
      formik,
      async () => {
        try {
          const contact = formik.values.resume.contact;
          if (contact) {
            await upsertContact.mutation.mutateAsync({
              resumeId: formik.values.resume.id,
              contact,
            });
            alert.success("Changes saved");
          }
        } catch (err) {
          alert.error("Something went wrong");
        }
      },
      () => {
        formik.setTouched(getFormikTouchedObject(formik.values));
        alert.error(FORM_INVALID_MESSAGE);
      }
    );
  };

  //const isFormValid = !Boolean(formik.errors?.resume?.contact);

  return (
    <MotionDiv>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-x-8 gap-y-2">
        <div className="col-span-1">
          <FormikInput
            label="Full Name *"
            name="resume.contact.fullName"
            placeholder="Rajesh Khanna"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Email Address *"
            name="resume.contact.email"
            placeholder="rajeshkhanna@gmail.com"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Phone Number *"
            name="resume.contact.phone"
            placeholder="+91-9434309778"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Linkedin URL"
            name="resume.contact.linkedinUrl"
            placeholder="in/rajesh-khanna"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Personal Website or Relevant Link"
            name="resume.contact.personalUrl"
            placeholder="https://www.rajeshkhanna.com"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Country *"
            name="resume.contact.country"
            placeholder="India"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="State"
            name="resume.contact.state"
            placeholder="Maharashtra"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="City"
            name="resume.contact.city"
            placeholder="Mumbai"
          />
        </div>
        <div className="col-span-1">
          <Button
            label="Save Contact Information"
            type="button"
            //disabled={!isFormValid}
            processing={formik.isSubmitting || upsertContact.isPending}
            customClassNames="w-full"
            onClick={handleSaveContactForm}
          />
        </div>
      </div>
    </MotionDiv>
  );
}
