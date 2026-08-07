import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { BrandText } from "./BrandSpotlight";
import {
  MEMBER_COUNT,
  NEXT_EVENT,
  formatPageById,
  type FormatPageId,
} from "./constants";

function FormatTitle({ id }: { id: FormatPageId }) {
  const page = formatPageById(id);
  if (page.titleKind === "hause-of-soul") {
    return (
      <>
        Hause of <em>{page.emWord}</em>
      </>
    );
  }
  return (
    <>
      Soul <em>{page.emWord}</em>
    </>
  );
}

export function FormatPage({ id }: { id: FormatPageId }) {
  const page = formatPageById(id);

  return (
    <main
      id="main-content"
      className="format-page page-flow"
      data-format={id}
    >
      <div className="format-atmosphere" aria-hidden="true" />
      <Nav />

      <header className="format-stage">
        <div className="wrap format-stage-inner" data-reveal>
          <p className="format-tag mono">{page.format}</p>
          <h1 className="format-title">
            <FormatTitle id={id} />
          </h1>
          <p className="format-lede">
            <BrandText text={page.whyLede} />
          </p>

          <div className="format-stage-cta">
            <a
              href={page.ctaHref}
              {...(page.showNextEvent ? { "data-join-gate": true } : {})}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {page.ctaLabel} <span className="arrow">→</span>
            </a>
            {page.showNextEvent ? (
              <p className="format-meta">
                {NEXT_EVENT.shortTitle} · {NEXT_EVENT.shortDate}
              </p>
            ) : (
              <p className="format-meta">{MEMBER_COUNT} on Luma</p>
            )}
          </div>
        </div>
      </header>

      <section className="format-beats" aria-label="What the night looks like">
        <div className="wrap">
          <ol className="format-beats-list">
            {page.moments.map((moment, index) => (
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

      {"note" in page.story && page.story.note ? (
        <section className="format-note" aria-label={page.story.label}>
          <div className="wrap format-note-inner" data-reveal>
            <p>
              <BrandText text={page.story.note} />
            </p>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
