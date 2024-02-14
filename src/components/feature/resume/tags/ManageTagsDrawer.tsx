import Drawer, { DrawerProps } from "@/components/global/Drawer";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { shallowEqual } from "react-redux";
import NewTag from "./NewTag";
import EditTag from "./EditTag";
import { resumeTagSelectors } from "@/redux/slices/resumeSlice";

type ManageTagsDrawerProps = DrawerProps;

export default function ManageTagsDrawer(props: ManageTagsDrawerProps) {
  const resumeTags = useAppSelector(
    (state) => resumeTagSelectors.selectAll(state.resume.tags),
    shallowEqual
  );
  return (
    <Drawer position="right" customClasses="hide-scrollbar" {...props}>
      <div className="mb-4 text-xl font-semibold text-gray-500 dark:text-gray-400">
        Manage Resume Tags
      </div>
      <div className="mb-6">
        <NewTag label="Create New Tag" />
      </div>
      <div className="flex flex-wrap items-start gap-4">
        {resumeTags.map((tag) => {
          if (!tag) return <></>;
          return <EditTag key={tag.id} tag={tag} />;
        })}
      </div>
    </Drawer>
  );
}
