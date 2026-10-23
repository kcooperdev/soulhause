import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { brand } from "@/lib/brand";
import { vendorOffer } from "@/lib/content";

export const metadata: Metadata = {
  title: `Vend · ${brand.name}`,
  description: "Apply for a $50 vendor spot at a BMore Tech Nights mixer.",
};

export default function VendPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Vendors</p>
        <h1>Bring what you’re building.</h1>
        <p className="lede">
          Connect with our community through a curated vendor spot at BMore Tech Nights.
        </p>
        <p className="price">{vendorOffer.price}</p>
        <p>Vendor spots are limited by the room and by approval. A number of spots isn’t published until a venue is set.</p>
        <div className="actions">
          <a className="btn coral" href="#vendor-form">
            Apply to Vend
          </a>
          <a className="btn white" href="#vendor-form">
            Book a Vendor Call
          </a>
        </div>
        <p>A call is optional. You can send the application without booking one. Call scheduling isn’t connected on this site yet.</p>
      </header>
      <section className="panel">
        <h2>How it works</h2>
        <ul className="plain-list">
          {vendorOffer.confirmed.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="panel">
        <h2>Not confirmed yet</h2>
        <p>These are open questions, not inclusions. We won’t treat them as promises.</p>
        <ul className="plain-list">
          {vendorOffer.unconfirmed.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <InquiryForm
        id="vendor-form"
        legend="Vendor application"
        submitLabel="Apply to Vend"
        fields={[
          { name: "name", label: "Contact name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "org", label: "Business / organization name", required: true },
          { name: "link", label: "Website or social link", type: "url" },
          {
            name: "offer",
            label: "Product or service description",
            type: "textarea",
            required: true,
          },
          {
            name: "event",
            label: "Preferred event",
            type: "select",
            required: true,
            options: ["Next published night", "A later night", "Not sure yet"],
          },
          { name: "space", label: "Setup and space requirements", type: "textarea" },
          {
            name: "power",
            label: "Electricity requirements",
            type: "select",
            options: ["No power needed", "Power needed", "Not sure"],
          },
          { name: "notes", label: "Additional notes", type: "textarea" },
        ]}
      />
    </div>
  );
}
