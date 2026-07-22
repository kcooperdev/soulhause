import { JOIN_URL, PRIMARY_CTA } from "./constants";

type PageCtaProps = {
  title: React.ReactNode;
  sub: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function PageCta({
  title,
  sub,
  primaryHref = JOIN_URL,
  primaryLabel = PRIMARY_CTA,
}: PageCtaProps) {
  return (
    <section className="sec-close">
      <div className="wrap close-inner">
        <p className="close-brand" aria-label="SoulHause">
          <span className="brand-soul">Soul</span>
          <span className="brand-hause">Hause</span>
        </p>
        <h2 className="close-title">{title}</h2>
        <p className="close-sub">{sub}</p>
        <a
          href={primaryHref}
          data-join-gate
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {primaryLabel} <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
