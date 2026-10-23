import type { Metadata } from "next";
import { ResourceList } from "@/components/ResourceList";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Resources · ${brand.name}`,
  description:
    "Tech resources for the Baltimore community, and the organizations that provide that support.",
};

export default function ResourcesPage() {
  return (
    <div className="page">
      <header className="panel flat">
        <p className="kicker">Resources</p>
        <h1>Baltimore tech resources</h1>
        <p className="lede">
          Tools, programs, and organizations that support the Baltimore tech community. A card appears after we’ve checked the link.
        </p>
      </header>
      <ResourceList />
    </div>
  );
}
