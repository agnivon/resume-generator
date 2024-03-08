import RenderIf from "@/components/global/RenderIf";
import { ResumeFormTab } from "@/constants/state.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import { ResumeFormValues } from "@/types/form.types";
import { ResumePreviewSettings } from "@/types/template.types";
import { formikLogger, getToastErrMessage } from "@/utils/form.utils";
import { getResumeFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { ResumeV2 } from "@prisma/client";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import CertificationsForm from "./CertificationsForm";
import ContactForm from "./ContactForm";
import CoursesForm from "./CoursesForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import ResumeFormTabs from "./ResumeFormTabs";
import SkillsForm from "./SkillsForm";
import SummaryForm from "./SummaryForm";
import useUpdateResumeV2ById from "@/hooks/resume/data/v2/useUpdateResumeV2ById";
import CustomSectionsForm from "./CustomSectionsForm";

type ResumeFormProps = {
  resume: ResumeV2;
  currentTab?: ResumeFormTab;
  previewSettings: ResumePreviewSettings | null;
};

export default function ResumeForm(props: ResumeFormProps) {
  const { resume, currentTab = ResumeFormTab.CONTACT } = props;

  const updateResume = useUpdateResumeV2ById();

  const alert = useAlert();

  const resumeFormInitialValues: ResumeFormValues = {
    resume: resume,
  };

  const validationSchema = React.useMemo(
    () => getResumeFormSchema(currentTab),
    [currentTab]
  );

  const handleSubmit = async (
    values: ResumeFormValues,
    formik: FormikHelpers<ResumeFormValues>
  ) => {
    formik.setSubmitting(true);
    try {
      await updateResume.mutation.mutateAsync({
        id: resume.id,
        resume: { [currentTab]: values.resume[currentTab] },
      });
      alert.success("Details saved");
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
    formik.setSubmitting(false);
  };

  return (
    <>
      <div>
        <Formik
          initialValues={resumeFormInitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount={true}
          enableReinitialize={true}
        >
          {(formik) => {
            formikLogger(formik, "Resume Form");
            return (
              <Form className="flex flex-col gap-y-8">
                <ResumeFormTabs currentTab={currentTab} />
                <RenderIf isTrue={currentTab === ResumeFormTab.CONTACT}>
                  <ContactForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.EXPERIENCE}>
                  <ExperienceForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.PROJECT}>
                  <ProjectForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.EDUCATION}>
                  <EducationForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.CERTIFICATIONS}>
                  <CertificationsForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.COURSEWORK}>
                  <CoursesForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.SKILLS}>
                  <SkillsForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.CUSTOM_SECTIONS}>
                  <CustomSectionsForm />
                </RenderIf>
                <RenderIf isTrue={currentTab === ResumeFormTab.SUMMARY}>
                  <SummaryForm />
                </RenderIf>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
