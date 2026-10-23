import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { SponsorPicker } from "@/components/SponsorPicker";
import { brand } from "@/lib/brand";
import { sponsorLimits, sponsorTiers } from "@/lib/content";

export const metadata: Metadata = {
  title: `Sponsor · ${brand.name}`,
  description:
    "Sponsor BMore Tech Nights for one, three, or six events. Packages start at $300.",
};

export default function SponsorPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Sponsors</p>
        <h1>Help make meaningful connections happen.</h1>
        <p className="lede">
          Support a night—or build with us across the year. Your partnership helps keep general admission free and supports materials, event promotion, and photography.
        </p>
        <p>
          If you already gather people, <a href="/partner">community partner is free</a>.
        </p>
        <a className="btn green" href="#sponsor-form">
          Start a Sponsorship Conversation
        </a>
      </header>
      <SponsorPicker />
      <div className="grid-3">
        {sponsorTiers.map((tier) => (
          <article className="card quiet" id={tier.id} key={tier.id}>
            <h2>{tier.name}</h2>
            <p className="price">${tier.one.toLocaleString()}</p>
            <p>per event · {tier.availability}</p>
            <ul className="plain-list">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="panel">
        <h2>What a package does not include</h2>
        <ul className="plain-list">
          {sponsorLimits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Benefits repeat at each contracted event unless we agree otherwise. Payment follows an inquiry, a written agreement, and an invoice. There is no checkout on this page.
        </p>
      </section>
      <InquiryForm
        id="sponsor-form"
        legend="Sponsorship inquiry"
        submitLabel="Start a Sponsorship Conversation"
        fields={[
          { name: "name", label: "Contact name", required: true },
          { name: "org", label: "Organization", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "site", label: "Website", type: "url" },
          {
            name: "tier",
            label: "Preferred tier",
            type: "select",
            required: true,
            options: sponsorTiers.map((tier) => tier.name),
          },
          {
            name: "span",
            label: "One, three, or six events",
            type: "select",
            required: true,
            options: ["One event", "Three events", "Six events"],
          },
          { name: "dates", label: "Preferred dates, if known" },
          { name: "goals", label: "Partnership goals", type: "textarea", required: true },
          { name: "activation", label: "Optional activation idea", type: "textarea" },
          { name: "notes", label: "Additional notes", type: "textarea" },
        ]}
      />
    </div>
  );
}
