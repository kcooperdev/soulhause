"use client";

import { SignedSteps, type SignedStep } from "@/components/SignedSteps";

const steps: SignedStep[] = [
  {
    id: "kind",
    kind: "choice",
    question: "What kind of group is this?",
    groupLabel: "Group",
    empty: "Choose a group.",
    options: ["Meetup", "School", "Nonprofit", "Student group", "Workforce program", "Accelerator", "Other"],
  },
  {
    id: "other",
    kind: "text",
    question: "What kind of group?",
    empty: "Name the kind of group.",
    when: (answers) => answers.kind === "Other",
  },
  {
    id: "org",
    kind: "text",
    question: "What is the group called?",
    empty: "Add the group name.",
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
    id: "who",
    kind: "long",
    question: "Who do you already gather?",
    hint: "One or two sentences.",
    empty: "Say who you already gather.",
  },
  {
    id: "link",
    kind: "text",
    question: "Where can people find the group?",
    hint: "A website or social link. You can skip this.",
    empty: "",
    optional: true,
    validate: (value) => (/^[^\s]+\.[^\s]+$/.test(value) ? "" : "Enter a link like yoursite.com."),
  },
  {
    id: "agree",
    kind: "agree",
    question: "Share the night.",
    label: "We will tell our people about the next night and share it at least once.",
  },
];

export function PartnerApplication() {
  return (
    <SignedSteps
      formId="partner-form"
      kicker="Community partner"
      steps={steps}
      summary={(answers, signedOn) => [
        ["Group", answers.kind === "Other" ? answers.other : answers.kind],
        ["Name", answers.org],
        ["Contact", answers.name],
        ["Email", answers.email],
        ["Gathers", answers.who],
        ["Link", answers.link?.trim() || "None"],
        ["Date", signedOn],
      ]}
      finish={{
        kicker: "Partner",
        title: "You're in.",
        detail: "Community partner is free. No call and no fee.",
      }}
    />
  );
}
