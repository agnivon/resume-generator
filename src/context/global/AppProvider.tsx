import { getNextAuthServerSession } from "@/utils/session.utils";
import SessionProvider from "./SessionProvider";
import ReduxProvider from "./ReduxProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import ThemeContextProvider from "./ThemeContextProvider";
import AlertProvider from "./AlertProvider";

const AppProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getNextAuthServerSession();

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <ReactQueryProvider>
          <ThemeContextProvider>
            <AlertProvider>
              {children}
            </AlertProvider>
          </ThemeContextProvider>
        </ReactQueryProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default AppProvider;
