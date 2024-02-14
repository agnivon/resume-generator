import Badge, { BADGE_COLORS } from "@/components/global/Badge";
import RenderIf from "@/components/global/RenderIf";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { RESUME_TAG_NAME_LENGTH } from "@/constants/schema.constants";
import useIsGlobalQueryRunning from "@/hooks/query/useIsGlobalQueryRunning";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useUpdateResumeTag from "@/hooks/resume/data/useUpdateResumeTag";
import { resumeTagSelectors } from "@/redux/slices/resumeSlice";
import { getToastErrMessage } from "@/utils/form.utils";
import {
  ArrowPathIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ResumeTag } from "@prisma/client";
import { Tooltip } from "flowbite-react";
import React from "react";
import { useAlert } from "react-alert";
import { shallowEqual } from "react-redux";
import TagNameError from "./TagNameError";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";

type EditTagProps = {
  tag: ResumeTag;
};

export default function EditTag(props: EditTagProps) {
  const { tag } = props;

  const resumeTags = useAppSelector(
    (state) =>
      resumeTagSelectors
        .selectAll(state.resume.tags)
        .filter((t) => t && t.id !== tag.id),
    shallowEqual
  );

  const { dispatch } = useResumesPageContext();
  const { mutation: saveTagMutation } = useUpdateResumeTag();
  const { globalRunning } = useIsGlobalQueryRunning();
  const alert = useAlert();

  const [mode, setMode] = React.useState<"badge" | "field">("badge");
  const [name, setName] = React.useState<string>(tag.name);
  const [colorIndex, setColorIndex] = React.useState<number>(
    BADGE_COLORS.findIndex((c) => c === tag.color)
  );

  const isDuplicateName = React.useMemo(
    () => resumeTags.find((rt) => rt && rt.name === name) !== undefined,
    [name, resumeTags]
  );

  const isInvalidLengthName = name.length > RESUME_TAG_NAME_LENGTH;

  const isInvalidName = isDuplicateName || isInvalidLengthName || !name;

  const handleChangeColor = () => {
    setColorIndex((index) => (index + 1) % BADGE_COLORS.length);
  };

  const handleDeleteTag = () => {
    dispatch(ResumesPageActions.setShowDeleteResumeTagConfirmModal(tag.id));
  };

  const handleSaveTag = async () => {
    try {
      if (name) {
        const updatedTag = await saveTagMutation.mutateAsync({
          id: tag.id,
          tag: {
            name,
            color: BADGE_COLORS[colorIndex],
          },
        });
        // formik.setFieldValue(
        //   "tags",
        //   produce(formik.values.tags, (draft) => {
        //     draft.unshift(tag.id);
        //   })
        // );
        handleCancel(updatedTag.name, updatedTag.color);
      } else {
        throw new Error("Values missing");
      }
    } catch (err) {
      alert.error(getToastErrMessage(err));
    }
  };

  const handleCancel = (tagName = tag.name, tagColor = tag.color) => {
    setMode("badge");
    setName(tagName);
    setColorIndex(BADGE_COLORS.findIndex((c) => c === tagColor));
  };

  return (
    <MotionDiv className="flex gap-2 items-center relative">
      <Badge
        size={"sm"}
        color={BADGE_COLORS[colorIndex]}
        customClassNames="gap-1.5 h-7"
        type="default"
      >
        <RenderIf isTrue={mode === "badge"}>
          <span>{tag.name}</span>
          <Tooltip content="Edit" className="text-xs">
            <button
              type="button"
              className="rounded-full"
              onClick={() => setMode("field")}
              disabled={globalRunning}
            >
              <PencilIcon className="h-4 w-4 mt-1 text-blue-400 hover:animate-pulse" />
            </button>
          </Tooltip>
          <Tooltip content="Delete" className="text-xs">
            <button
              type="button"
              className="rounded-full"
              onClick={() => handleDeleteTag()}
              disabled={globalRunning}
            >
              <TrashIcon className="h-4 w-4 mt-1 text-red-500 hover:animate-pulse" />
            </button>{" "}
          </Tooltip>
        </RenderIf>
        <RenderIf isTrue={mode === "field"}>
          <input
            //type="text"
            className="border-0 border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 cursor-text flex-grow-0 min-w-[5ex] max-w-[25ex]"
            placeholder="Name"
            autoFocus
            //disabled={globalRunning}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSaveTag();
              }
            }}
            style={{ width: `${name.length}ex` }}
          />
          <Tooltip
            content="Save Changes"
            //theme={TooltipCustomTheme}
            className="text-xs"
          >
            <button
              type="button"
              className="text-green-400 disabled:text-green-600 [&:not([disabled])]:hover:animate-pulse"
              disabled={globalRunning || isInvalidName}
              onClick={() => handleSaveTag()}
            >
              <CheckIcon className="h-4 w-4 mt-1" />
            </button>
          </Tooltip>
          <Tooltip
            content="Cancel"
            //theme={TooltipCustomTheme}
            className="text-xs"
          >
            <button
              type="button"
              onClick={() => handleCancel()}
              disabled={globalRunning}
            >
              <XMarkIcon className="h-5 w-5 mt-1 text-red-500 hover:animate-pulse" />
            </button>
          </Tooltip>
          <Tooltip
            content="Change Color"
            //theme={TooltipCustomTheme}
            className="text-xs"
          >
            <button
              type="button"
              className="flex flex-col justify-center"
              onClick={handleChangeColor}
              disabled={globalRunning}
            >
              <ArrowPathIcon className="h-4 w-4 mt-1 mb-1.5 text-gray-700 dark:text-gray-300" />
            </button>
          </Tooltip>
        </RenderIf>
      </Badge>
      <TagNameError
        isDuplicateName={isDuplicateName}
        isInvalidLengthName={isInvalidLengthName}
      />
    </MotionDiv>
  );
}
