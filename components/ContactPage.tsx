"use client";

import { Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { brand } from "@/lib/brand";
import { contact, workPackages } from "@/lib/offerings";

const guesses = ["unsure", ...workPackages.map((pack) => pack.id)] as const;

function packLabel(id: string) {
  if (id === "unsure") return "Not sure. Tell me.";
  const pack = workPackages.find((item) => item.id === id);
  if (!pack) return id;
  return `${pack.name} (${pack.price}${pack.unit})`;
}

function ContactForm() {
  const params = useSearchParams();
  const raw = params.get("pack") ?? "unsure";
  const selected = guesses.includes(raw as (typeof guesses)[number])
    ? raw
    : "unsure";

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const site = String(data.get("site") ?? "").trim();
    const pack = String(data.get("pack") ?? "").trim();
    const problem = String(data.get("problem") ?? "").trim();
    const subject = encodeURIComponent(
      `Free audit${name ? `: ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Package: ${packLabel(pack)}`,
        site ? `Site: ${site}` : "",
        problem,
        name,
        email,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="omega-form" onSubmit={send}>
      <label>
        Name
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        Website
        <input
          type="url"
          name="site"
          autoComplete="url"
          inputMode="url"
          placeholder="https://"
          required
        />
      </label>
      <label>
        Package, best guess
        <select name="pack" defaultValue={selected} required>
          {guesses.map((id) => (
            <option key={id} value={id}>
              {packLabel(id)}
            </option>
          ))}
        </select>
      </label>
      <label>
        What is the workflow, and what is off?
        <textarea
          name="problem"
          rows={4}
          required
          placeholder="Leads do not show. Checkout tags fire twice. We cannot see the sales steps."
        />
      </label>
      <button type="submit" className="omega-btn">
        {contact.name}
      </button>
      <p className="omega-fine">{contact.what}</p>
    </form>
  );
}

export function ContactPage() {
  return (
    <div className="omega omega-page omega-page--narrow">
      <header className="omega-page-hero" aria-labelledby="contact-title">
        <p className="omega-kicker">{contact.kicker}</p>
        <h1 id="contact-title">{contact.line}</h1>
        <p className="omega-lede">{contact.what}</p>
      </header>

      <Suspense>
        <ContactForm />
      </Suspense>
    </div>
  );
}
