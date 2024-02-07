import AppProvider from "@/context/global/AppProvider";
import MotionDiv from "../global/motion/MotionDiv";
import NProgressBar from "../feature/nprogress/NProgress";

/* const ResponsiveMessage = () => (
  <div className="flex xl:hidden w-full h-screen overflow-y-auto overflow-x-hidden print:hidden">
    <main className="h-full w-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto print:hidden">
      This website is supposed to be viewed in a larger window
    </main>
  </div>
); */

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppProvider>
        <MotionDiv
          className="w-full min-h-screen print-initial"
          id="rootContainer"
        >
          <NProgressBar />
          <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto print-initial print-bg-color-reset">
            {children}
          </div>
        </MotionDiv>
        {/* <ResponsiveMessage /> */}
      </AppProvider>
    </>
  );
};

export default BaseLayout;
