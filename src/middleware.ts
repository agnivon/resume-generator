import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let blockedPathRegExps = [
  new RegExp(`^\/api\/resume\/v1\/[0-9a-fA-F]{24}(?!\/preview-settings)`),
  new RegExp(`^\/api\/resumes\/v1`),
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    blockedPathRegExps
      .map((regex) => request.nextUrl.pathname.match(regex))
      .some((v) => v)
  ) {
    return NextResponse.redirect(new URL("/404", request.url));
  }
}
