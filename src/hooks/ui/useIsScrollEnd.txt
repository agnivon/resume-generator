import React, { LegacyRef, Ref } from "react";

export default function useIsScrollEnd(
  ref: React.MutableRefObject<HTMLElement | null>
) {
  const [end, isEnd] = React.useState<boolean>(false);
  const handleScroll = () => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      const scrollHeight = ref.current.scrollHeight;
      const clientHeight = ref.current.clientHeight;

      if (scrollHeight > clientHeight) {
        const scrollPercentage =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercentage > 90) isEnd(true);
        else isEnd(false);
      } else {
        isEnd(true);
      }
    }
  };
  React.useEffect(() => {
    handleScroll();
    ref.current?.addEventListener("scroll", handleScroll);
    return () => {
      ref.current?.removeEventListener("scroll", handleScroll);
      isEnd(false);
    };
  }, [
    ref.current?.scrollTop,
    ref.current?.scrollHeight,
    ref.current?.clientHeight,
  ]);

  return end;
}
