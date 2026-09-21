import { HouseNav } from "@/components/HouseNav";
import { brand } from "@/lib/brand";
import { about } from "@/lib/offerings";
import { folx } from "@/lib/folx";

export function AboutPage() {
  return (
    <div className="house-page">
      <HouseNav />
      <article className="gold-body gold-about">
        <p className="gold-kicker">{about.kicker}</p>
        <h2 className="gold-title">{about.line}</h2>
        <p className="gold-lead">{about.what}</p>
        <p className="gold-lead">{folx.manifesto}</p>
        <p className="gold-lead">{folx.night}</p>
        <a className="gold-go" href={`mailto:${brand.email}`}>
          {folx.cta}
        </a>
      </article>
    </div>
  );
}
