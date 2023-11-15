import PilledTabs from "@/components/global/tabs/PilledTabs";
import { ResumeFormTab } from "@/constants/state.constants";
import { useResumePageContext } from "@/context/ResumePageContextProvider";
import { ResumePageActions } from "@/reducers/ResumePageReducer";
import { ResumeFormValues } from "@/types/form.types";
import { FormikProps, useFormikContext } from "formik";
import React from "react";
import _ from "lodash";
import ConfirmationModal from "./modals/ConfirmationModal";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { exclude } from "@/utils/object.utils";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";

export default function ResumeFormTabs({}: {}) {
  const { value, state, dispatch } = useResumePageContext();

  const formik = useFormikContext<ResumeFormValues>();

  const { globalRunning } = useIsGlobalQueryRunning();

  const [changeTab, setChangeTab] = React.useState<ResumeFormTab | null>(null);

  //const isCurrentTabFinishUp = state.currentTab == ResumeFormTab.FINISH_UP;

  const isTabDisabled = globalRunning;

  const handleChangeTab = async (tab: ResumeFormTab | null) => {
    if (tab) {
      formik.resetForm({
        values: {
          ...formik.values,
          resume: value.resume,
        },
      });
      dispatch(ResumePageActions.setCurrentTab(tab));
      setChangeTab(null);
    }
  };

  const handleTabClicked = (tab: ResumeFormTab) => {
    if (state.currentTab !== tab) {
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
      label: "Contact",
      current: state.currentTab === ResumeFormTab.CONTACT,
      onClick: () => handleTabClicked(ResumeFormTab.CONTACT),
      loading: state.currentTab !== ResumeFormTab.CONTACT && isTabDisabled,
    },
    {
      label: "Experience",
      current: state.currentTab === ResumeFormTab.EXPERIENCE,
      onClick: () => handleTabClicked(ResumeFormTab.EXPERIENCE),
      loading: state.currentTab !== ResumeFormTab.EXPERIENCE && isTabDisabled,
    },
    {
      label: "Project",
      current: state.currentTab === ResumeFormTab.PROJECT,
      onClick: () => handleTabClicked(ResumeFormTab.PROJECT),
      loading: state.currentTab !== ResumeFormTab.PROJECT && isTabDisabled,
    },
    {
      label: "Education",
      current: state.currentTab === ResumeFormTab.EDUCATION,
      onClick: () => handleTabClicked(ResumeFormTab.EDUCATION),
      loading: state.currentTab !== ResumeFormTab.EDUCATION && isTabDisabled,
    },
    {
      label: "Certifications",
      current: state.currentTab === ResumeFormTab.CERTIFICATIONS,
      onClick: () => handleTabClicked(ResumeFormTab.CERTIFICATIONS),
      loading:
        state.currentTab !== ResumeFormTab.CERTIFICATIONS && isTabDisabled,
    },
    {
      label: "Coursework",
      current: state.currentTab === ResumeFormTab.COURSEWORK,
      onClick: () => handleTabClicked(ResumeFormTab.COURSEWORK),
      loading: state.currentTab !== ResumeFormTab.COURSEWORK && isTabDisabled,
    },
    {
      label: "Skills",
      current: state.currentTab === ResumeFormTab.SKILLS,
      onClick: () => handleTabClicked(ResumeFormTab.SKILLS),
      loading: state.currentTab !== ResumeFormTab.SKILLS && isTabDisabled,
    },
    {
      label: "Summary",
      current: state.currentTab === ResumeFormTab.SUMMARY,
      onClick: () => handleTabClicked(ResumeFormTab.SUMMARY),
      loading: state.currentTab !== ResumeFormTab.SUMMARY && isTabDisabled,
    },
    {
      label: "Preview",
      current: state.currentTab === ResumeFormTab.PREVIEW,
      onClick: () => handleTabClicked(ResumeFormTab.PREVIEW),
      loading: state.currentTab !== ResumeFormTab.PREVIEW && isTabDisabled,
    },
  ];

  return (
    <div className="print-hidden" id="resumeFormTabs">
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
