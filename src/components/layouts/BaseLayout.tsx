import AppProvider from "@/context/global/AppProvider";
import { Inter } from "next/font/google";
import Script from "next/script";
import NProgressBar from "../feature/nprogress/NProgress";
import MotionDiv from "../global/motion/MotionDiv";

const inter = Inter({ subsets: ["latin"] });

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <Script src="/scripts/nprogress.js"></Script>
        <body className={inter.className}>
          <AppProvider>
            <MotionDiv className="w-full min-h-screen print-initial">
              <NProgressBar />
              <div
                id="rootContainer"
                className="max-h-screen bg-white dark:bg-gray-900 text-black dark:text-white w-full overflow-y-auto print-initial print-bg-color-reset"
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
