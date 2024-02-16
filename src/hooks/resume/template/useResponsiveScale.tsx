import React from "react";

export default function useResponsiveScale(
  initScale: number = 1,
  responsive: boolean
) {
  const [scale, setScale] = React.useState<number | undefined>(initScale);

  React.useEffect(() => {
    const handleResize = () => {
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      //console.log(viewportWidth);
      let newScale = initScale;
      if (viewportWidth < 950) newScale = viewportWidth / 1000;
      setScale(newScale);
    };
    if (responsive) {
      handleResize();
      window.addEventListener("resize", handleResize);
    } else {
      window.removeEventListener("resize", handleResize);
      setScale(initScale);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [initScale, responsive]);

  return scale;
}
