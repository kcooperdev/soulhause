import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How BMore Tech Scene handles information you type on this site.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="page">
      <article className="panel prose">
        <p className="kicker">Privacy</p>
        <h1>Privacy Policy</h1>
        <p>Last updated: October 28, 2026.</p>
        <p>
          BMore Tech Scene (“we”, “us”) operates{" "}
          <a href={brand.site}>{brand.site.replace("https://", "")}</a> (the “site”). This page says what personal information we ask for, what we do with it, and what this site does not collect.
        </p>

        <h2>Information we ask for</h2>
        <p>Some forms ask for details that can identify you:</p>
        <ul className="plain-list">
          <li>
            Event submission: event name, date, optional time, venue or place, event link, optional description, your name, email, and a checkbox that the listing is a tech event and follows the guidelines.
          </li>
        </ul>
        <p>
          That form is not connected yet. Until it is, what you type stays in your browser. We do not receive it, store it, or email you because of it.
        </p>
        <p>
          When the form is connected, we will use what you send to list the event on this site. Listings outside tech can be removed. We do not sell personal information.
        </p>

        <h2>Log data</h2>
        <p>
          We do not use Google Analytics or another analytics product on this site. We do not build a profile of your visits.
        </p>
        <p>
          The site can be installed on a phone or computer. A service worker then stores pages on your device so they can open again. That copy stays on your device. You can clear it in your browser settings.
        </p>

        <h2>Communications</h2>
        <p>
          This site does not send newsletters yet. An email signup may return later. Until then, we are not collecting a list from this site.
        </p>

        <h2>Cookies</h2>
        <p>
          We do not set tracking cookies, and the site does not require cookies to read the pages. Your browser may still store the installed-site cache described above. You can refuse or delete site data in the browser. The pages will still open.
        </p>

        <h2>The calendar</h2>
        <p>
          Dates and registration live on Luma at{" "}
          <a href={brand.calendar}>luma.com/bmore-tech-nights</a>. When you subscribe or register there, Luma’s own privacy policy applies to what they collect. We do not receive your Luma account details through this site.
        </p>

        <h2>Security</h2>
        <p>
          No method of sending or storing information on the internet is perfectly secure. We will use ordinary care once a form can actually send a message. We cannot promise that a transmission could never be intercepted.
        </p>

        <h2>Changes</h2>
        <p>
          This policy is effective as of October 28, 2026. If we change it, we will post the new version on this page and change the date. If a change is material and we already have your email because you joined a connected list, we will also write to that address.
        </p>

        <h2>Contact</h2>
        <p>This site does not take messages. At an event listed here, find someone from the host.</p>
      </article>
    </div>
  );
}
