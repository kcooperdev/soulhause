import { Plus_Jakarta_Sans, Space_Mono, Unbounded } from "next/font/google";
import "@/app/tad.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export default function TechAfterDarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`tad ${unbounded.variable} ${jakarta.variable} ${spaceMono.variable}`}>
      {children}
    </div>
  );
}
