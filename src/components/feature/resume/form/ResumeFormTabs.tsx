import PilledTabs from "@/components/global/tabs/PilledTabs";
import { Routes } from "@/constants/routes.constants";
import { ResumeFormTab } from "@/constants/state.constants";
import { useResumePageContext } from "@/context/page/ResumePageContextProvider";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import { ResumePageActions } from "@/reducers/ResumePageReducer";
import { ResumeFormValues } from "@/types/form.types";
import { exclude } from "@/utils/object.utils";
import { useFormikContext } from "formik";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ConfirmationModal from "./modals/ConfirmationModal";

export default function ResumeFormTabs({
  currentTab = ResumeFormTab.CONTACT,
}: {
  currentTab?: ResumeFormTab;
}) {
  const { value } = useResumePageContext();

  const formik = useFormikContext<ResumeFormValues>();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { globalRunning } = useIsGlobalQueryRunning();

  const [changeTab, setChangeTab] = React.useState<ResumeFormTab | null>(null);

  //const isCurrentTabFinishUp = currentTab == ResumeFormTab.FINISH_UP;

  const isTabDisabled = globalRunning;

  const handleChangeTab = async (tab: ResumeFormTab | null) => {
    if (tab) {
      formik.resetForm({
        values: {
          ...formik.values,
          resume: value.resume,
        },
      });
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("tab", tab);
      router.push(`${pathname}?${params.toString()}`);
      setChangeTab(null);
    }
  };

  const handleTabClicked = (tab: ResumeFormTab) => {
    if (currentTab !== tab) {
      const currentData = formik.values.resume;
      const savedData = value.resume;
      if (
        !_.isEqualWith(currentData, savedData, (v1, v2) => {
          const obj1 = exclude(v1, ["id"]);
          const obj2 = exclude(v2, ["id"]);
          //console.log(obj1, obj2);
          return _.isEqual(obj1, obj2);
        })
      ) {
        setChangeTab(tab);
      } else {
        handleChangeTab(tab);
      }
    }
  };

  const tabs = [
    {
      label: "Personal Info",
      current: currentTab === ResumeFormTab.CONTACT,
      onClick: () => handleTabClicked(ResumeFormTab.CONTACT),
      loading: currentTab !== ResumeFormTab.CONTACT && isTabDisabled,
    },
    {
      label: "Experience",
      current: currentTab === ResumeFormTab.EXPERIENCE,
      onClick: () => handleTabClicked(ResumeFormTab.EXPERIENCE),
      loading: currentTab !== ResumeFormTab.EXPERIENCE && isTabDisabled,
    },
    {
      label: "Projects",
      current: currentTab === ResumeFormTab.PROJECT,
      onClick: () => handleTabClicked(ResumeFormTab.PROJECT),
      loading: currentTab !== ResumeFormTab.PROJECT && isTabDisabled,
    },
    {
      label: "Education",
      current: currentTab === ResumeFormTab.EDUCATION,
      onClick: () => handleTabClicked(ResumeFormTab.EDUCATION),
      loading: currentTab !== ResumeFormTab.EDUCATION && isTabDisabled,
    },
    {
      label: "Certifications",
      current: currentTab === ResumeFormTab.CERTIFICATIONS,
      onClick: () => handleTabClicked(ResumeFormTab.CERTIFICATIONS),
      loading: currentTab !== ResumeFormTab.CERTIFICATIONS && isTabDisabled,
    },
    {
      label: "Coursework",
      current: currentTab === ResumeFormTab.COURSEWORK,
      onClick: () => handleTabClicked(ResumeFormTab.COURSEWORK),
      loading: currentTab !== ResumeFormTab.COURSEWORK && isTabDisabled,
    },
    {
      label: "Skills",
      current: currentTab === ResumeFormTab.SKILLS,
      onClick: () => handleTabClicked(ResumeFormTab.SKILLS),
      loading: currentTab !== ResumeFormTab.SKILLS && isTabDisabled,
    },
    {
      label: "Custom Sections",
      current: currentTab === ResumeFormTab.CUSTOM_SECTIONS,
      onClick: () => handleTabClicked(ResumeFormTab.CUSTOM_SECTIONS),
      loading: currentTab !== ResumeFormTab.CUSTOM_SECTIONS && isTabDisabled,
    },
    {
      label: "Summary",
      current: currentTab === ResumeFormTab.SUMMARY,
      onClick: () => handleTabClicked(ResumeFormTab.SUMMARY),
      loading: currentTab !== ResumeFormTab.SUMMARY && isTabDisabled,
    },
    {
      label: "Preview",

      onClick: () =>
        router.push(Routes.GET_RESUME_PREVIEW_WITH_ID(value.resume.id)),
      loading: isTabDisabled,
    },
  ];

  return (
    <div className="print:hidden" id="resumeFormTabs">
      <ConfirmationModal
        show={!!changeTab}
        onClose={() => setChangeTab(null)}
        message="You have unsaved changes. Do you
  wish to continue?"
        onConfirm={() => handleChangeTab(changeTab)}
      />
      <PilledTabs tabs={tabs} />
    </div>
  );
}
