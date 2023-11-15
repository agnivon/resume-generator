import ResumePage from "@/components/pages/ResumePage";

export default function Resume({ params }: { params: { resumeId: string } }) {
  return <ResumePage resumeId={params.resumeId} />;
}
