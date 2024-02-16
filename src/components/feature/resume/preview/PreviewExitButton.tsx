import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function PreviewExitButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="-ml-2 mb-5 text-lg xl:text-xl font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <ChevronLeftIcon
          className="h-7 w-7"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <span className="leading-none">Go Back</span>
      </div>
    </div>
  );
}
