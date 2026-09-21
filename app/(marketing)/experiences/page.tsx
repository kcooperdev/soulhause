import type { Metadata } from "next";
import { HouseNav } from "@/components/HouseNav";
import { brand, brandPillars } from "@/lib/brand";
import { folx } from "@/lib/folx";

export const metadata: Metadata = {
  title: `Experiences · ${brand.name}`,
  description: brand.sell,
};

export default function Page() {
  return (
    <div className="house-page">
      <HouseNav />
      <article className="gold-body gold-about">
        <p className="gold-kicker">The work</p>
        <h1 className="gold-title">Experiences</h1>
        <table className="exp-table">
          <thead>
            <tr>
              <th scope="col">Experience</th>
              <th scope="col">Includes</th>
            </tr>
          </thead>
          <tbody>
            {brandPillars.map((pillar) => (
              <tr key={pillar.id}>
                <th scope="row">{pillar.name}</th>
                <td>{pillar.points.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <a className="gold-go" href={`mailto:${brand.email}`}>
          {folx.cta}
        </a>
      </article>
    </div>
  );
}
