import Link from "next/link";
import { SiteFrame } from "@/components/SiteFrame";
import "@/app/site.css";

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="page">
        <section className="hero">
          <h1>This page isn’t here.</h1>
          <Link className="btn" href="/">
            Back home
          </Link>
        </section>
      </div>
    </SiteFrame>
  );
}
