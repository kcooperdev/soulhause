import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function themeFromPath(pathname: string): string {
  const path = (pathname ?? "/").split("?")[0]?.replace(/\/+$/, "") || "/";
  if (path === "/events" || path.startsWith("/events/")) return "events";
  if (path === "/os" || path.startsWith("/os/")) return "os";
  if (path === "/about" || path.startsWith("/about/")) return "about";
  if (path === "/studio" || path.startsWith("/studio/")) return "studio";
  return "home";
}

/** Stamps the request with the page theme so root layout can SSR html[data-theme]. */
export function proxy(request: NextRequest) {
  const theme = themeFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-soul-theme", theme);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
