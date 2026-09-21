import { BrandLockup } from "@/components/FolxMark";
import { about, contact } from "@/lib/offerings";
import { folx } from "@/lib/folx";

export function AboutPage() {
  return (
    <>
      <BrandLockup as="h1" />
      <article className="gold-body gold-about">
        <p className="gold-kicker">{about.kicker}</p>
        <h2 className="gold-title">{about.line}</h2>
        <p className="gold-lead">{about.what}</p>
        <p className="gold-lead">{folx.manifesto}</p>
        <p className="gold-lead">{folx.night}</p>
        <a className="gold-go" href={contact.href} target="_blank" rel="noopener noreferrer">
          {folx.cta}
        </a>
      </article>
    </>
  );
}
