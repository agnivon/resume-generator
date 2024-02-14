import Badge, { BadgeColor } from "@/components/global/Badge";
import Button, { ButtonColor, ButtonSize } from "@/components/global/Button";
import { TooltipCustomTheme } from "@/constants/flowbite.constants";
import { useResumesPageContext } from "@/context/page/ResumesPageContextProvider";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ResumesPageActions } from "@/reducers/ResumesPageReducer";
import { resumeTagSelectors } from "@/redux/slices/resumeSlice";
import { classNames } from "@/utils";
import { ChevronUpDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "flowbite-react";
import { shallowEqual } from "react-redux";

export default function ResumeTagFilter() {
  const { state, dispatch } = useResumesPageContext();
  const resumeTags = useAppSelector(
    (state) => resumeTagSelectors.selectAll(state.resume.tags),
    shallowEqual
  );

  const tagFilterState = state.filter.tags;
  const filteredTagCount = tagFilterState.length;
  const tagsSelectedCount = filteredTagCount;

  const handleToggle = (id: string, selected: boolean) => {
    if (selected) {
      dispatch(ResumesPageActions.addTagToFilter(id));
    } else {
      dispatch(ResumesPageActions.removeTagFromFilter(id));
    }
  };

  const handleClear = () => {
    dispatch(ResumesPageActions.setTagFilter([]));
  };

  return (
    <div id="resumeGridTagFilter" className="max-sm:w-full relative">
      {filteredTagCount > 0 && (
        <Badge
          size="xs"
          pilled
          color="dark"
          customClassNames="w-6 h-6 !p-0 justify-center absolute -top-2 -end-2 border border-gray-300 dark:border-gray-500"
        >
          {filteredTagCount}
        </Badge>
      )}
      <Tooltip
        content={
          <div className="sm:w-96 w-72 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-600 flex items-center h-10">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {`${tagsSelectedCount} Tag(s) selected`}
              </h3>
              {tagFilterState.length > 0 && (
                <Button
                  label="Clear"
                  size={ButtonSize.EXTRA_SMALL}
                  color={ButtonColor.LIGHT}
                  Icon={XCircleIcon}
                  customClassNames="ml-auto h-6"
                  customIconClassNames="text-red-500 !h-4 !w-4 !mr-1"
                  onClick={handleClear}
                />
              )}
            </div>
            <div className="flex gap-3 flex-wrap p-3 max-h-96 overflow-y-auto">
              {resumeTags.length > 0 ? (
                resumeTags.map((tag) => {
                  if (!tag) return null;
                  const selected = tagFilterState.includes(tag.id);
                  return (
                    <Badge
                      key={tag.id}
                      color={tag.color as BadgeColor}
                      customClassNames={classNames(
                        "cursor-pointer transition-opacity select-none",
                        !selected ? "opacity-50" : ""
                      )}
                      onClick={() => handleToggle(tag.id, !selected)}
                    >
                      <span>{tag.name}</span>
                    </Badge>
                  );
                })
              ) : (
                <>No tags</>
              )}
            </div>
          </div>
        }
        //ref={tooltipRef}
        theme={TooltipCustomTheme}
        trigger="click"
        style="auto"
        arrow={false}
        placement="bottom"
      >
        <Button
          //size={ButtonSize.LARGE}
          color={ButtonColor.LIGHT}
          Icon={ChevronUpDownIcon}
          label={"Filter Tags"}
          //onClick={handleNewResumeButtonClicked}
          customClassNames="max-sm:w-full"
        />
      </Tooltip>
    </div>
  );
}
