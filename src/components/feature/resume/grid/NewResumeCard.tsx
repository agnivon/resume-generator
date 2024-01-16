import Card from "@/components/global/Card";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function NewResumeCard() {
  const { dispatch } = useResumesPageContext();

  const handleNewResumeCardClicked = () => {
    dispatch(ResumesPageActions.setShowNewResumeModal(true));
  };

  return (
    <div className="a8">
      <div className="border border-transparent cursor-pointer group h-full space-y-4">
        <Card
          customClassNames="h-full flex flex-col justify-end shadow-none group-hover:shadow relative !p-0"
          onClick={handleNewResumeCardClicked}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <PlusCircleIcon className="h-12 w-12 text-gray-200 dark:text-gray-600 group-hover:text-gray-300 dark:group-hover:text-white" />
          </div>
          <div className="text-gray-600 dark:text-white group-hover:flex hidden bg-gray-100 dark:bg-gray-700 rounded-b-md w-full justify-center py-2">
            <div>Create New Resume</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
