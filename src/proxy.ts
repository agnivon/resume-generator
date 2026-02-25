import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  BLOCKED_ROUTES,
  PUBLIC_ROUTES,
  Routes,
} from "./constants/routes.constants";

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware(request) {
    if (
      BLOCKED_ROUTES.map((regex) => request.nextUrl.pathname.match(regex)).some(
        (v) => v
      )
    ) {
      return NextResponse.redirect(new URL("/404", request.nextUrl));
    }
    if (request.nextauth.token) {
      if (request.nextUrl.pathname.startsWith(Routes.SIGNIN)) {
        return NextResponse.redirect(new URL(Routes.RESUMES, request.nextUrl));
      }
    }
    return null;
  },
  {
    callbacks: {
      authorized: ({ req: request, token }) => {
        //console.log(request.nextUrl.pathname);
        if (token) return true;
        else if (
          !PUBLIC_ROUTES.some((r) => {
            if (r === Routes.ROOT)
              return request.nextUrl.pathname === Routes.ROOT;
            return request.nextUrl.pathname.startsWith(r);
          })
        ) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next|api/auth|scripts|images|fonts).*)(.+)"],
};
