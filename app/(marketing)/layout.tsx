import { MarketingShell } from "@/components/MarketingShell";
import "@/app/studio.css";
import "@/app/house.css";
import "@/app/folx-scroll.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell>{children}</MarketingShell>;
}
