import Link from "next/link";
import { WorkPackages } from "@/components/WorkPackages";
import { contact, work, workFor, workNot, workSteps } from "@/lib/offerings";

export function WorkPage() {
  return (
    <div className="omega omega-page">
      <header className="omega-page-hero" aria-labelledby="work-title">
        <p className="omega-kicker">{work.kicker}</p>
        <h1 id="work-title">{work.line}</h1>
        <p className="omega-lede">{work.what}</p>
        <div className="omega-cta">
          <Link className="omega-btn" href={contact.href}>
            {contact.name}
          </Link>
        </div>
      </header>

      <ol className="omega-steps">
        {workSteps.map((step, index) => (
          <li key={step.name}>
            <span>0{index + 1}</span>
            <h3>{step.name}</h3>
            <p>{step.line}</p>
          </li>
        ))}
      </ol>

      <section className="omega-section" aria-labelledby="work-packs">
        <div className="omega-section-head">
          <p className="omega-kicker">Packages</p>
          <h2 id="work-packs">Pick the depth.</h2>
        </div>
        <WorkPackages />
      </section>

      <section className="omega-split" aria-label="Who this is for">
        <div>
          <h3>For you if</h3>
          <ul>
            {workFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Not for you if</h3>
          <ul>
            {workNot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
