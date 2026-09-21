import { HouseNav } from "@/components/HouseNav";
import { brand, brandPillars } from "@/lib/brand";
import { folx } from "@/lib/folx";

export function PillarPage({
  id,
}: {
  id: (typeof brandPillars)[number]["id"];
}) {
  const pillar = brandPillars.find((item) => item.id === id);
  if (!pillar) return null;

  return (
    <div className="house-page">
      <HouseNav />
      <article className="gold-body gold-about">
        <p className="gold-kicker">The work</p>
        <h1 className="gold-title">{pillar.name}</h1>
        <p className="gold-lead">{pillar.line}</p>
        <ul className="gold-points">
          {pillar.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a className="gold-go" href={`mailto:${brand.email}`}>
          {folx.cta}
        </a>
      </article>
    </div>
  );
}
