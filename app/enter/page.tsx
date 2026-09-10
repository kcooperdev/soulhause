import type { Metadata } from "next";
import { EventsApp } from "@/components/EventsApp";

export const metadata: Metadata = {
  title: "Enter · SoulHause",
  description: "Join Tech Hause. The membership of SoulHause.",
};

export default function EnterPage() {
  return <EventsApp skipGate />;
}
