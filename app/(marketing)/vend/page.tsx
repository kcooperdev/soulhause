import { VendorApplication } from "@/components/VendorApplication";
import { vendorRules } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vend",
  description: "Sign up for a $50 vendor spot at a BMore Tech Nights mixer. No call and no approval.",
  path: "/vend",
});

export default function VendPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Vendors</p>
        <h1>Sign up to vend.</h1>
        <p className="lede">$50 for one event. You finish it here. No call and no approval.</p>
        <a className="btn coral" href="#vendor-form">
          Start
        </a>
      </header>
      <section className="panel">
        <h2>The rules</h2>
        <ul className="plain-list">
          {vendorRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
      <VendorApplication />
    </div>
  );
}
