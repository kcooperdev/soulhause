import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Community Partner · ${brand.name}`,
  description:
    "Community partner is free for Baltimore groups that already bring people together.",
};

const gets = [
  "It is free. There is no partner fee.",
  "Your group is listed with the other community partners.",
  "We thank you in the room, with the other partners.",
  "The people you send walk in on general admission, which is always free.",
];

const shares = [
  "Tell your community about the next night.",
  "Share it at least once.",
  "Include it in your newsletter if you send one.",
];

export default function PartnerPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Community partner · Free</p>
        <h1>Bring your people.</h1>
        <p className="lede">
          If you already gather people in Baltimore, community partner is free. A meetup, a school, a nonprofit, a student group, a workforce program, an accelerator. Your circle trusts you. We want them in the room.
        </p>
        <a className="btn green" href="#partner-form">
          Apply to partner
        </a>
      </header>

      <section className="grid-2">
        <article className="card quiet path" style={{ ["--tone" as string]: "#ffe14a" }}>
          <h2>What you get</h2>
          <ul className="plain-list">
            {gets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card quiet path" style={{ ["--tone" as string]: "#2f6bff" }}>
          <h2>What you share</h2>
          <ul className="plain-list">
            {shares.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <p>
        Sponsorship is a different path, for organizations that want a paid package.{" "}
        <Link href="/sponsor">See sponsor packages</Link>.
      </p>

      <InquiryForm
        id="partner-form"
        legend="Community partner application"
        submitLabel="Apply to partner"
        fields={[
          { name: "name", label: "Contact name", required: true },
          { name: "org", label: "Group or organization", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "site", label: "Website or social link", type: "url" },
          {
            name: "who",
            label: "Who you already gather",
            type: "textarea",
            required: true,
          },
          {
            name: "share",
            label: "How you’ll share the night",
            type: "textarea",
            required: true,
          },
        ]}
      />
    </div>
  );
}
