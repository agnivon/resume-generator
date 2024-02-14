import { Tooltip } from "flowbite-react";

import Badge, { BadgeColor } from "@/components/global/Badge";
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/global/Button";
import { TooltipCustomTheme } from "@/constants/flowbite.constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ResumeMetadataFormSchema } from "@/validation/schema/form/resume.form.v2.schema";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useFormikContext } from "formik";
import { produce } from "immer";
import React from "react";
import { shallowEqual } from "react-redux";
import { InferType } from "yup";
import { resumeTagSelectors } from "@/redux/slices/resumeSlice";

export default function SelectTag() {
  const formik = useFormikContext<InferType<typeof ResumeMetadataFormSchema>>();

  const resumeTags = useAppSelector(
    (state) => resumeTagSelectors.selectAll(state.resume.tags),
    shallowEqual
  );
  const unselectedResumeTags = React.useMemo(
    () => resumeTags.filter((t) => t && !formik.values.tags.includes(t.id)),
    [resumeTags, formik.values.tags]
  );
  const handleSelect = (id: string) => {
    formik.setFieldValue(
      "tags",
      produce(formik.values.tags, (draft) => {
        draft.unshift(id);
      })
    );
  };
  return (
    <Tooltip
      content={
        <div className="w-64  text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tags
            </h3>
          </div>
          <div className="flex gap-2 flex-wrap p-3 max-h-64 overflow-y-auto">
            {unselectedResumeTags.length > 0 ? (
              unselectedResumeTags.map((tag) => {
                return tag ? (
                  <Badge
                    key={tag.id}
                    color={tag.color as BadgeColor}
                    customClassNames="h-7 cursor-pointer transition-transform hover:-translate-y-0.5"
                    onClick={() => handleSelect(tag.id)}
                  >
                    <span>{tag.name}</span>
                  </Badge>
                ) : null;
              })
            ) : (
              <>No unselected tags</>
            )}
          </div>
        </div>
      }
      theme={TooltipCustomTheme}
      trigger="click"
      style="auto"
      arrow={false}
    >
      <Button
        color={ButtonColor.BLUE}
        variant={ButtonVariant.GRADIENT_MONO}
        label={"Select"}
        Icon={ChevronUpDownIcon}
        size={ButtonSize.SMALL}
        customClassNames="h-7"
        customIconClassNames="!h-4 !w-4 !mr-1"
        //onClick={() => setMode("field")}
        //disabled={globalRunning}
      />
    </Tooltip>
  );
}
