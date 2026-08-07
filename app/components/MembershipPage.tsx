import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { BrandText } from "./BrandSpotlight";
import {
  HAUSE_OF_SOUL_LUMA_URL,
  NEXT_EVENT,
  OS_PRODUCT,
  PRIMARY_CTA,
} from "./constants";

export function MembershipPage() {
  return (
    <main
      id="main-content"
      className="format-page page-flow"
      data-format="membership"
    >
      <div className="format-atmosphere" aria-hidden="true" />
      <Nav />

      <header className="format-stage">
        <div className="wrap format-stage-inner" data-reveal>
          <p className="format-tag mono">Membership</p>
          <h1 className="format-title">
            Soul <em>OS</em>
          </h1>
          <p className="format-lede">
            <BrandText text={OS_PRODUCT.whyLede} />
          </p>

          <div className="format-stage-cta">
            <a
              href={HAUSE_OF_SOUL_LUMA_URL}
              data-join-gate
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {PRIMARY_CTA} <span className="arrow">→</span>
            </a>
            <p className="format-meta">
              {NEXT_EVENT.shortTitle} · {NEXT_EVENT.shortDate}
            </p>
          </div>
          <p className="format-meta-secondary">
            {OS_PRODUCT.status}.{" "}
            <a href={OS_PRODUCT.notifyHref} className="format-meta-link">
              {OS_PRODUCT.notifyLabel}
            </a>
          </p>
        </div>
      </header>

      <section className="format-beats" aria-label="How to start">
        <div className="wrap">
          <ol className="format-beats-list">
            {OS_PRODUCT.moments.map((moment, index) => (
              <li
                key={moment.title}
                className="format-beat"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
              >
                <p className="format-beat-num mono" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="format-beat-title">{moment.title}</h2>
                <p className="format-beat-body">{moment.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {OS_PRODUCT.story.note ? (
        <section className="format-note" aria-label={OS_PRODUCT.story.label}>
          <div className="wrap format-note-inner" data-reveal>
            <p>
              <BrandText text={OS_PRODUCT.story.note} />
            </p>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
