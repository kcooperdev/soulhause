"use client";

import { useLayoutEffect } from "react";
import { applyTheme, readTheme } from "@/lib/theme";

export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(readTheme());
  }, []);
  return null;
}
