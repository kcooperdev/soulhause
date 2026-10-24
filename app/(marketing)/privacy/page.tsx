import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How BMore Tech Nights handles information you type on this site.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="page">
      <article className="panel prose">
        <p className="kicker">Privacy</p>
        <h1>Privacy Policy</h1>
        <p>Last updated: October 23, 2026.</p>
        <p>
          BMore Tech Nights (“we”, “us”) operates{" "}
          <a href={brand.site}>{brand.site.replace("https://", "")}</a> (the “site”). This page says what personal information we ask for, what we do with it, and what this site does not collect.
        </p>

        <h2>Information we ask for</h2>
        <p>Some forms ask for details that can identify you:</p>
        <ul className="plain-list">
          <li>Email signup: first name and email address, plus a consent checkbox.</li>
          <li>Vendor application: business type, business name, what you will bring, your name, email, an optional link, team size, a night, and a signature you draw.</li>
          <li>Sponsorship form: package, number of events, organization, your name, email, an optional link, and an optional listing line. Community Sponsor and Event Partner also include a signature you draw. Presenting stops at booking a call.</li>
          <li>Community partner form: the kind of group, its name, your name, email, who the group gathers, an optional link, and a checkbox that you will share the night.</li>
        </ul>
        <p>
          Those forms are not connected to an email list or an inbox. Until they are, what you type stays in your browser. We do not receive it, store it, or email you because of it.
        </p>
        <p>
          When a form is connected, we will use what you send only for that form. A signup is for notices about upcoming nights. An application is so we can reply about vending, sponsorship, or a community partnership. We do not sell personal information.
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
          We email you about upcoming nights only if you join the list and check the consent box. That list is not connected yet, so this site is not sending those emails. Details from a vendor, sponsor, or partner form are not added to a newsletter.
        </p>
        <p>
          You can ask to leave the list once it exists. Until then, there is no list to leave.
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
          This policy is effective as of October 23, 2026. If we change it, we will post the new version on this page and change the date. If a change is material and we already have your email because you joined a connected list, we will also write to that address.
        </p>

        <h2>Contact</h2>
        <p>This site does not take messages. At an event, find someone from BMore Tech Nights.</p>
      </article>
    </div>
  );
}
