import type { Metadata } from "next";
import { PillarPage } from "@/components/PillarPage";
import { brand, brandPillars } from "@/lib/brand";

const pillar = brandPillars[2];

export const metadata: Metadata = {
  title: `${pillar.name} · ${brand.name}`,
  description: pillar.line,
};

export default function Page() {
  return <PillarPage id="learning" />;
}