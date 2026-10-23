"use client";

import { SignedSteps, type SignedStep } from "@/components/SignedSteps";

const steps: SignedStep[] = [
  {
    id: "type",
    kind: "choice",
    question: "What type of business is this?",
    groupLabel: "Business type",
    empty: "Choose a business type.",
    options: ["Technology", "Food or drink", "Retail", "Creative", "Services", "Other"],
  },
  {
    id: "other",
    kind: "text",
    question: "What kind of business?",
    empty: "Name the kind of business.",
    autoComplete: "organization",
    when: (answers) => answers.type === "Other",
  },
  {
    id: "business",
    kind: "text",
    question: "What is the business name?",
    empty: "Add the business name.",
    autoComplete: "organization",
  },
  {
    id: "offer",
    kind: "long",
    question: "What will you bring?",
    hint: "One or two sentences is enough.",
    empty: "Say what you will bring.",
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
    hint: "A website or social link. You can skip this.",
    empty: "",
    optional: true,
    validate: (value) => (/^[^\s]+\.[^\s]+$/.test(value) ? "" : "Enter a link like yoursite.com."),
  },
  {
    id: "team",
    kind: "choice",
    question: "How many people from your team?",
    groupLabel: "Team",
    empty: "Choose how many people.",
    options: ["Just me", "Two people"],
  },
  {
    id: "night",
    kind: "choice",
    question: "Which night?",
    groupLabel: "Night",
    empty: "Choose a night.",
    options: ["The Offer, November 4", "A later night"],
  },
  {
    id: "sign",
    kind: "sign",
    question: "Sign the application.",
    agreement: () =>
      "I am signing up to vend at one BMore Tech Nights event for $50. Up to two people from my team may work the spot. I will bring my own setup. A table and power are not included. I will be ready by the start time on the event page. Recruiting and large brand activations are sponsorship. This page does not take payment.",
  },
];

export function VendorApplication() {
  return (
    <SignedSteps
      formId="vendor-form"
      kicker="Vendor application"
      steps={steps}
      summary={(answers, signedOn) => [
        ["Business type", answers.type === "Other" ? answers.other : answers.type],
        ["Business", answers.business],
        ["Bringing", answers.offer],
        ["Name", answers.name],
        ["Email", answers.email],
        ["Link", answers.link?.trim() || "None"],
        ["Team", answers.team],
        ["Night", answers.night],
        ["Signed name", answers.signedName],
        ["Date", signedOn],
      ]}
    />
  );
}
