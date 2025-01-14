import AppProvider from "@/context/global/AppProvider";
import { Inter } from "next/font/google";
import Script from "next/script";
import NProgressBar from "../feature/nprogress/NProgress";
import MotionDiv from "../global/motion/MotionDiv";
import { classNames } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <Script src="/scripts/nprogress.js"></Script>
        <body
          className={classNames(
            inter.className,
            "w-full overflow-x-hidden bg-white dark:bg-gray-900 text-black dark:text-white"
          )}
        >
          <Analytics />
          <SpeedInsights />
          <AppProvider>
            <MotionDiv className="w-full print-initial">
              <NProgressBar />
              <div
                id="rootContainer"
                className="w-full print-initial print-bg-color-reset"
              >
                {children}
              </div>
            </MotionDiv>
          </AppProvider>
        </body>
      </html>
    </>
  );
};

export default BaseLayout;
