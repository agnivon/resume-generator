import Button, { ButtonColor } from "@/components/global/Button";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { classNames } from "@/utils";
import { TagIcon } from "@heroicons/react/24/solid";

export default function ManageTagsButton({
  customClassNames,
}: {
  customClassNames: string;
}) {
  const { dispatch } = useResumesPageContext();

  const handleResumeTagsButtonClicked = () => {
    dispatch(ResumesPageActions.setShowManageTagsDrawer(true));
  };
  return (
    <Button
      label="Manage Tags"
      color={ButtonColor.LIGHT}
      Icon={TagIcon}
      onClick={handleResumeTagsButtonClicked}
      customClassNames={classNames("max-sm:w-full", customClassNames)}
    />
  );
}
