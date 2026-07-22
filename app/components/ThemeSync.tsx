"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { themeFromPath } from "./theme";

/** Keeps html[data-theme] in sync across client navigations. */
export function ThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = themeFromPath(pathname);
  }, [pathname]);

  return null;
}
