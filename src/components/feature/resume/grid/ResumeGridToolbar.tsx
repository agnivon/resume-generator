import ManageTagsButton from "./ManageTagsButton";
import NewResumeButton from "./NewResumeButton";
import ResumeTagFilter from "./filters/ResumeTagFilter";

export default function ResumeGridToolbar() {
  return (
    <div className="mb-10 flex max-sm:flex-col items-center gap-4">
      <NewResumeButton />
      {/* <div className="w-0 h-9 border-r border-gray-500"></div> */}
      <ResumeTagFilter />
      <ManageTagsButton customClassNames="sm:ml-auto" />
    </div>
  );
}
