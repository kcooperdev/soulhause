import { SponsorApplication } from "@/components/SponsorApplication";
import { sponsorTiers } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sponsor",
  description:
    "Sign a Community Sponsor or Event Partner package, or book a call for Presenting. Packages start at $300.",
  path: "/sponsor",
});

export default function SponsorPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Sponsors</p>
        <h1>Sign a package.</h1>
        <p className="lede">
          Community Sponsor and Event Partner sign here. Presenting books a short call first, then signs after the welcome and the table are placed.
        </p>
        <p>
          If you already gather people, <a href="/partner">community partner is free</a>.
        </p>
      </header>
      <div className="grid-3">
        {sponsorTiers.map((tier) => (
          <article className="card quiet" id={tier.id} key={tier.id}>
            <h2>{tier.name}</h2>
            <p className="price">${tier.one.toLocaleString()}</p>
            <p>one event · {tier.availability}</p>
            <p>{tier.id === "presenting" ? "Book a call, then sign." : "Sign on this page."}</p>
            <ul className="plain-list">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <SponsorApplication />
    </div>
  );
}
