import Button from "@/components/global/Button";
import FormikInput from "@/components/global/forms/formik/FormikInput";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { ResumeFormValues } from "@/types/form.types";
import { useFormikContext } from "formik";

export default function ContactForm() {
  const formik = useFormikContext<ResumeFormValues>();

  //const alert = useAlert();

  //const upsertContact = useUpsertContact();

  /* const handleSaveContactForm = async () => {
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
  }; */

  //const isFormValid = !Boolean(formik.errors?.resume?.contact);

  return (
    <MotionDiv>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-x-8 gap-y-2">
        <div className="col-span-1">
          <FormikInput
            label="Full Name *"
            name="resume.contact.fullName"
            placeholder="Emily Thompson"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Email Address *"
            name="resume.contact.email"
            placeholder="emilythompson@gmail.com"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Phone Number *"
            name="resume.contact.phone"
            placeholder="+91-0000000000"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Linkedin URL"
            name="resume.contact.linkedinUrl"
            placeholder="in/emily-thompson"
          />
        </div>
        <div className="col-span-1">
          <FormikInput
            label="Personal Website or Relevant Link"
            name="resume.contact.personalUrl"
            placeholder="https://www.emilythompson.com"
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
            label="Save Personal Information"
            type="submit"
            //disabled=\{!formik\.isValid\}
            processing={formik.isSubmitting}
            customClassNames="w-full"
          />
        </div>
      </div>
    </MotionDiv>
  );
}
