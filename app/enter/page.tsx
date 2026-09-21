import type { Metadata } from "next";
import { EventsApp } from "@/components/EventsApp";

export const metadata: Metadata = {
  title: "Enter · TechFolx",
  description: "Join Tech Hause. The membership of TechFolx.",
};

export default function EnterPage() {
  return <EventsApp skipGate />;
}
