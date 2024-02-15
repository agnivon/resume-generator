import Drawer, { DrawerProps } from "@/components/global/Drawer";
import { ResumeV2 } from "@prisma/client";
import { DOMAttributes } from "react";
import PreviewSettingsPanel from "./PreviewSettingsPanel";

type ResumePreviewDrawerProps = DrawerProps & {
  resume: ResumeV2;
};

export default function ResumePreviewDrawer(props: ResumePreviewDrawerProps) {
  const { resume, ...rest } = props;

  return (
    <div className="xl:hidden print:hidden">
      <Drawer position="bottom" {...rest}>
        <PreviewSettingsPanel resume={resume} />
      </Drawer>
    </div>
  );
}
