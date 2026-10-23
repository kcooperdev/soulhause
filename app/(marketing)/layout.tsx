import { SiteFrame } from "@/components/SiteFrame";
import "@/app/site.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteFrame>{children}</SiteFrame>;
}
