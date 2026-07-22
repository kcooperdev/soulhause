import Link from "next/link";
import { JOIN_URL, PRIMARY_CTA } from "./constants";
import { BrandSpotlight } from "./BrandSpotlight";

type PageCtaProps = {
  title: React.ReactNode;
  sub: React.ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  /** When true, opens the Luma join gate. Default true for RSVP links. */
  primaryJoinGate?: boolean;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
};

export function PageCta({
  title,
  sub,
  primaryHref = JOIN_URL,
  primaryLabel = PRIMARY_CTA,
  primaryJoinGate = true,
  primaryExternal = true,
  secondaryHref,
  secondaryLabel,
  secondaryExternal = false,
}: PageCtaProps) {
  const primaryProps = {
    href: primaryHref,
    className: "btn btn-primary",
    ...(primaryJoinGate ? { "data-join-gate": true } : {}),
    ...(primaryExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  } as const;

  return (
    <section className="sec-close">
      <div className="wrap close-inner">
        <BrandSpotlight as="p" className="close-brand" aria-label="SoulHause" quiet>
          <span className="brand-soul brand-sunflow brand-sunflow--quiet">Soul</span>
          <span className="brand-hause brand-sunflow brand-sunflow--quiet">Hause</span>
        </BrandSpotlight>
        <h2 className="close-title">{title}</h2>
        <p className="close-sub">{sub}</p>
        <a {...primaryProps}>
          {primaryLabel} <span className="arrow">→</span>
        </a>
        {secondaryHref && secondaryLabel ? (
          secondaryExternal ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="close-secondary"
            >
              {secondaryLabel} <span className="arrow">→</span>
            </a>
          ) : (
            <Link href={secondaryHref} className="close-secondary">
              {secondaryLabel} <span className="arrow">→</span>
            </Link>
          )
        ) : null}
      </div>
    </section>
  );
}
