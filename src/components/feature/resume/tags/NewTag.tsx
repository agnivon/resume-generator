import Badge, { BADGE_COLORS } from "@/components/global/Badge";
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/global/Button";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { RESUME_TAG_NAME_LENGTH } from "@/constants/schema.constants";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useCreateResumeTag from "@/hooks/resume/data/useCreateResumeTag";
import { resumeTagSelectors } from "@/redux/slices/resumeSlice";
import { getToastErrMessage } from "@/utils/form.utils";
import {
  ArrowPathIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { ResumeTag } from "@prisma/client";
import { Tooltip, TooltipProps } from "flowbite-react";
import React from "react";
import { useAlert } from "react-alert";
import { shallowEqual } from "react-redux";
import TagNameError from "./TagNameError";

type NewTagProps = {
  label?: string;
  tooltipTheme?: TooltipProps["theme"];
  onCreated?: (tag: ResumeTag) => void;
};

export default function NewTag({
  label = "New",
  tooltipTheme,
  onCreated,
}: NewTagProps) {
  const resumeTags = useAppSelector(
    (state) => resumeTagSelectors.selectAll(state.resume.tags),
    shallowEqual
  );
  const { mutation: createTagMutation } = useCreateResumeTag();
  const { globalRunning } = useIsGlobalQueryRunning();
  const alert = useAlert();

  const [mode, setMode] = React.useState<"button" | "field">("button");
  const [name, setName] = React.useState<string>("");
  const [colorIndex, setColorIndex] = React.useState<number>(0);

  const isDuplicateName = React.useMemo(
    () => resumeTags.find((rt) => rt && rt.name === name) !== undefined,
    [name, resumeTags]
  );

  const isInvalidLengthName = name.length > RESUME_TAG_NAME_LENGTH;

  const isInvalidName = isDuplicateName || isInvalidLengthName || !name;

  const handleChangeColor = () => {
    setColorIndex((index) => (index + 1) % BADGE_COLORS.length);
  };

  const handleCreateTag = async () => {
    try {
      if (name) {
        const tag = await createTagMutation.mutateAsync({
          name,
          color: BADGE_COLORS[colorIndex],
        });
        onCreated?.(tag);
        handleCancel();
      } else {
        throw new Error("Values missing");
      }
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
  };

  const handleCancel = () => {
    setName("");
    setMode("button");
  };

  if (mode === "button") {
    return (
      <Button
        color={ButtonColor.BLUE}
        variant={ButtonVariant.GRADIENT_MONO}
        label={label}
        Icon={PlusIcon}
        size={ButtonSize.SMALL}
        customClassNames="h-7"
        customIconClassNames="!h-4 !w-4 !mr-1"
        onClick={() => setMode("field")}
        disabled={globalRunning}
      />
    );
  } else {
    return (
      <MotionDiv className="flex gap-2 items-center relative">
        <Badge
          size={"sm"}
          color={BADGE_COLORS[colorIndex]}
          customClassNames="gap-1.5 h-7"
          type="default"
        >
          <input
            //type="text"
            className="border-0 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 cursor-text flex-grow-0 min-w-[5ex] max-w-[25ex]"
            placeholder="Name"
            autoFocus
            disabled={globalRunning}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreateTag();
              } else if(e.key === "Escape") {
                e.preventDefault();
                handleCancel();
              }
            }}
            style={{ width: `${name.length}ex` }}
          />
          <Tooltip content="Create" theme={tooltipTheme} className="text-xs">
            <button
              type="button"
              className="text-green-400 disabled:text-green-600 [&:not([disabled])]:hover:animate-pulse"
              disabled={globalRunning || isInvalidName}
              onClick={() => handleCreateTag()}
            >
              <CheckIcon className="h-4 w-4 mt-1" />
            </button>
          </Tooltip>
          <Tooltip content="Cancel" theme={tooltipTheme} className="text-xs">
            <button
              type="button"
              onClick={handleCancel}
              disabled={globalRunning}
            >
              <XMarkIcon className="h-5 w-5 text-red-500 hover:animate-pulse mt-1" />
            </button>
          </Tooltip>
          <Tooltip
            content="Change Color"
            theme={tooltipTheme}
            className="text-xs"
          >
            <button
              type="button"
              className="flex flex-col justify-center"
              onClick={handleChangeColor}
              disabled={globalRunning}
            >
              <ArrowPathIcon className="h-4 w-4 mb-1.5 text-gray-700 dark:text-gray-300 mt-1" />
            </button>
          </Tooltip>
        </Badge>
        <TagNameError
          isDuplicateName={isDuplicateName}
          isInvalidLengthName={isInvalidLengthName}
        />
      </MotionDiv>
    );
  }
}
