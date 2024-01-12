import { getServerSession } from "next-auth";
import AlertProvider from "./AlertProvider";
import ReduxProvider from "./ReduxProvider";
import SessionProvider from "./SessionProvider";
import ThemeContextProvider from "./ThemeContextProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { getNextAuthServerSession } from "@/utils/session.utils";

const AppProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getNextAuthServerSession();

  return (
    <>
      <SessionProvider session={session}>
        <ReduxProvider>
          <ReactQueryProvider>
            <ThemeContextProvider>
              <AlertProvider>{children}</AlertProvider>
            </ThemeContextProvider>
          </ReactQueryProvider>
        </ReduxProvider>
      </SessionProvider>
    </>
  );
};

export default AppProvider;
