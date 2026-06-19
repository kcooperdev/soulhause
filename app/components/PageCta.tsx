import { JOIN_URL } from "./constants";

type PageCtaProps = {
  title: React.ReactNode;
  sub: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageCta({
  title,
  sub,
  primaryLabel = "Join the Community",
  secondaryHref,
  secondaryLabel,
}: PageCtaProps) {
  return (
    <section className="sec sec-cta-dark">
      <div className="wrap">
        <div className="cta-dark">
          <h2 className="cta-dark-title path-signature-head">{title}</h2>
          <p className="cta-dark-sub">{sub}</p>
          <div className="cta-dark-btns">
            <a
              href={JOIN_URL}
              data-join-gate
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {primaryLabel} <span className="arrow">→</span>
            </a>
            {secondaryHref && secondaryLabel ? (
              <a href={secondaryHref} className="btn btn-on-dark-ghost">
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
