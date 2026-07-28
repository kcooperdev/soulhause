import Script from "next/script";

/** beforeInteractive: set html[data-theme] from the URL before first paint. */
export function ThemeBoot() {
  const boot = `
(function () {
  var path = location.pathname.replace(/\\/+$/, "") || "/";
  var theme = "home";
  if (path === "/events" || path.indexOf("/events/") === 0) theme = "events";
  else if (path === "/os" || path.indexOf("/os/") === 0) theme = "os";
  else if (path === "/about" || path.indexOf("/about/") === 0) theme = "about";
  else if (path === "/studio" || path.indexOf("/studio/") === 0) theme = "studio";
  document.documentElement.dataset.theme = theme;
})();
`.trim();

  return (
    <Script id="theme-boot" strategy="beforeInteractive">
      {boot}
    </Script>
  );
}
