import { ResourceList } from "@/components/ResourceList";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resources",
  description: "Tools, programs, and organizations that support the Baltimore tech community.",
  path: "/resources",
});

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
