import RenderIf from "@/components/global/RenderIf";
import MotionDiv from "@/components/global/motion/MotionDiv";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

type ResumeTipsCardProps = {
  tips: { heading: string; content: string }[];
};

export default function ResumeTipsCard({ tips }: ResumeTipsCardProps) {
  const [show, setShow] = React.useState<boolean>(true);
  const [currentTip, setCurrentTip] = React.useState<number>(
    Math.floor(Math.random() * tips.length)
  );

  /* const maxCharacters = tips.reduce((p, c) => {
    return Math.max(p, c.heading.length + c.content.length);
  }, 0); */

  React.useEffect(() => {
    const id = setInterval(
      () => setCurrentTip((tip) => (tip + 1) % tips.length),
      10000
    );
    return () => clearInterval(id);
  }, [tips]);

  return (
    <RenderIf isTrue={show}>
      <div
        className="p-4 w-full rounded-lg bg-blue-50 dark:bg-blue-900"
        role="alert"
      >
        <div className="flex items-start justify-between mb-3">
          <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
            Tips
          </span>
          <button
            type="button"
            className=" bg-blue-50 -mx-1 -my-1 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            aria-label="Close"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div /* style={{ maxHeight: maxCharacters * 0.8 }} */>
          {tips.map((tip, idx) => {
            return idx === currentTip ? (
              <MotionDiv key={tip.heading}>
                <div className="text-sm text-blue-800 dark:text-blue-400">
                  <p className="font-bold mb-2">{tip.heading}</p>
                  <p>{tip.content}</p>
                </div>
              </MotionDiv>
            ) : null;
          })}
        </div>
      </div>
    </RenderIf>
  );
}
