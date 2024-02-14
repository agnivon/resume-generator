import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function NewResumeButton() {
  const { dispatch } = useResumesPageContext();

  const handleNewResumeButtonClicked = () => {
    dispatch(ResumesPageActions.setShowNewResumeModal(true));
  };

  return (
    <Button
      //size={ButtonSize.LARGE}
      color={ButtonColor.LIGHT}
      Icon={PlusIcon}
      label={"New Resume"}
      onClick={handleNewResumeButtonClicked}
      customClassNames="max-sm:w-full"
    />
  );
}
