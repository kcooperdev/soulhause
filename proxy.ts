import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Stamps unified theme for SSR html[data-theme]. */
export function proxy(_request: NextRequest) {
  const requestHeaders = new Headers(_request.headers);
  requestHeaders.set("x-soul-theme", "home");
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
