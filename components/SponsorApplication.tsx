"use client";

import { brand } from "@/lib/brand";
import { SignedSteps, type SignedStep } from "@/components/SignedSteps";
import { sponsorTiers } from "@/lib/content";

const presenting = "Presenting Sponsor";

const steps: SignedStep[] = [
  {
    id: "package",
    kind: "choice",
    question: "Which package?",
    groupLabel: "Package",
    empty: "Choose a package.",
    options: sponsorTiers.map((tier) => tier.name),
    clears: ["span"],
  },
  {
    id: "span",
    kind: "choice",
    question: "How many events?",
    groupLabel: "Number of events",
    empty: "Choose how many events.",
    options: (answers) => {
      const tier = sponsorTiers.find((item) => item.name === answers.package) ?? sponsorTiers[0];
      return [
        `One event · $${tier.one.toLocaleString()}`,
        `Three events · $${tier.three.toLocaleString()}`,
        `Six events · $${tier.six.toLocaleString()}`,
      ];
    },
  },
  {
    id: "org",
    kind: "text",
    question: "What is the organization name?",
    empty: "Add the organization name.",
    autoComplete: "organization",
  },
  {
    id: "name",
    kind: "text",
    question: "What is your name?",
    empty: "Add your name.",
    autoComplete: "name",
  },
  {
    id: "email",
    kind: "text",
    question: "What is your email?",
    empty: "Add your email.",
    inputType: "email",
    autoComplete: "email",
  },
  {
    id: "link",
    kind: "text",
    question: "Where can people find you?",
    hint: "A website. You can skip this.",
    empty: "",
    optional: true,
    validate: (value) => (/^[^\s]+\.[^\s]+$/.test(value) ? "" : "Enter a link like yoursite.com."),
  },
  {
    id: "listing",
    kind: "long",
    question: "How should we list you?",
    hint: "One sentence. You can skip this.",
    empty: "",
    optional: true,
  },
  {
    id: "book",
    kind: "book",
    question: "Book a short call.",
    detail:
      "Presenting is placed on a short call. The call sets the two-minute welcome and whether the room can hold an activation table. You sign after that. This is the only package that needs a call.",
    href: brand.presentingCall || undefined,
    when: (answers) => answers.package === presenting,
  },
  {
    id: "sign",
    kind: "sign",
    question: "Sign the package.",
    agreement: (answers) =>
      `I am signing up for ${answers.package || "a package"}: ${answers.span || "the span I chose"}. I am doing this myself. There is no call and no approval. This page does not take payment. Attendee contact details are not part of this package.`,
    when: (answers) => answers.package !== presenting,
  },
];

export function SponsorApplication() {
  return (
    <SignedSteps
      formId="sponsor-form"
      kicker="Sponsorship"
      steps={steps}
      summary={(answers, signedOn) => {
        const rows: [string, string][] = [
          ["Package", answers.package],
          ["Events", answers.span],
          ["Organization", answers.org],
          ["Name", answers.name],
          ["Email", answers.email],
          ["Link", answers.link?.trim() || "None"],
          ["Listing", answers.listing?.trim() || "None"],
        ];
        if (answers.package !== presenting) rows.push(["Signed name", answers.signedName]);
        rows.push(["Date", signedOn]);
        return rows;
      }}
      finish={{
        kicker: (answers) => (answers.package === presenting ? "Call" : "Signed"),
        title: (answers) => (answers.package === presenting ? "Book the call." : "You're signed up."),
        detail: (answers) =>
          answers.package === presenting
            ? "You’ll sign after the call, once the welcome and the table are placed."
            : "No call and no approval. This page does not take payment.",
      }}
    />
  );
}
