import RenderIf from "@/components/global/RenderIf";
import { ResumeFormTab } from "@/constants/state.constants";
import { INITIAL_PREVIEW_SETTINGS } from "@/constants/template.constants";
import { useResumePageContext } from "@/context/ResumePageContextProvider";
import useUpsertCompleteResume from "@/hooks/resume/data/useUpsertCompleteResume";
import { ResumeFormValues, ResumePreviewSettings } from "@/types/form.types";
import { CompleteResume } from "@/types/resume.types";
import { formikLogger } from "@/utils/form.utils";
import {
  CompleteResumeFormSchema,
  getResumeFormSchema,
} from "@/validation/schema/form/resume.form.schema";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import ResumePreview from "../preview/ResumePreview";
import CertificationsForm from "./CertificationsForm";
import ContactForm from "./ContactForm";
import CoursesForm from "./CoursesForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import ResumeFormTabs from "./ResumeFormTabs";
import SkillsForm from "./SkillsForm";
import SummaryForm from "./SummaryForm";

type ResumeFormProps = {
  resume: CompleteResume;
  previewSettings: ResumePreviewSettings | null;
};

export default function ResumeForm(props: ResumeFormProps) {
  const { resume, previewSettings } = props;
  const { state } = useResumePageContext();

  const upsertResume = useUpsertCompleteResume();

  const alert = useAlert();

  const currentTab = state.currentTab;

  const resumeFormInitialValues: ResumeFormValues = {
    resume: resume,
  };

  const previewFormValues: { previewSettings: ResumePreviewSettings } = {
    previewSettings: previewSettings || INITIAL_PREVIEW_SETTINGS(),
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
      await upsertResume.mutation.mutateAsync(values.resume);
      alert.success("Details saved");
    } catch {
      alert.error("Something went wrong");
    }
    formik.setSubmitting(false);
  };

  return (
    <>
      <div className="flex flex-col gap-y-8">
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
              <>
                <ResumeFormTabs />
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
                <RenderIf isTrue={currentTab === ResumeFormTab.SUMMARY}>
                  <SummaryForm />
                </RenderIf>
              </>
            );
          }}
        </Formik>
        <Formik
          initialValues={previewFormValues}
          onSubmit={() => undefined}
          enableReinitialize={true}
        >
          <RenderIf isTrue={currentTab === ResumeFormTab.PREVIEW}>
            <ResumePreview />
          </RenderIf>
        </Formik>
      </div>
    </>
  );
}
