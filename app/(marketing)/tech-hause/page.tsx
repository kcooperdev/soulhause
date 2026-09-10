import type { Metadata } from "next";
import { TechHausePage } from "@/components/OfferingPage";
import { techHause } from "@/lib/offerings";

export const metadata: Metadata = {
  title: `${techHause.name} · SoulHause`,
  description: techHause.line,
};

export default function Page() {
  return <TechHausePage />;
}
