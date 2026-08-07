import Script from "next/script";

/** beforeInteractive: one theme before first paint. */
export function ThemeBoot() {
  const boot = `
(function () {
  document.documentElement.dataset.theme = "home";
})();
`.trim();

  return (
    <Script id="theme-boot" strategy="beforeInteractive">
      {boot}
    </Script>
  );
}
