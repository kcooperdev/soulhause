export const THEME_KEY = "soulhause-theme-v1";
export type Theme = "light" | "dark";

export const THEME_LIGHT = "#f3f1ec";
export const THEME_DARK = "#1b1712";

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="dark"&&t!=="light")t="light";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export function readTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
  }
  if (typeof window === "undefined") return "light";
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    return raw === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  window.localStorage.setItem(THEME_KEY, theme);
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) =>
      meta.setAttribute("content", theme === "dark" ? THEME_DARK : THEME_LIGHT),
    );
}
