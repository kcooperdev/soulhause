import { Figtree, Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-hause-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hause-body",
  display: "swap",
});

export default function TechHauseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`hause-type ${fraunces.variable} ${figtree.variable}`}>
      {children}
    </div>
  );
}
