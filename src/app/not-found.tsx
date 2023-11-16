import ErrorMessage from "@/components/global/ErrorMessage";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <ErrorMessage message="Could not find the requested resource" />
    </div>
  );
}
