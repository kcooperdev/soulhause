import Link from "next/link";
import { contact, workPackages } from "@/lib/offerings";

export function WorkPackages() {
  return (
    <ul className="omega-packs">
      {workPackages.map((pack) => (
        <li key={pack.id} data-feature={pack.id === "setup" ? "true" : undefined}>
          {pack.id === "setup" ? <p className="omega-pack-tag">Most teams</p> : null}
          <h3>{pack.name}</h3>
          <p className="omega-price">
            {pack.price}
            {pack.unit ? <i>{pack.unit}</i> : null}
          </p>
          <p className="omega-pack-line">{pack.line}</p>
          <ul>
            {pack.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            className={pack.id === "setup" ? "omega-btn" : "omega-btn-ghost"}
            href={`${contact.href}?pack=${pack.id}`}
          >
            {pack.cta}
          </Link>
        </li>
      ))}
    </ul>
  );
}
