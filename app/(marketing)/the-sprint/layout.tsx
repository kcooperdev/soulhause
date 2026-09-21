import { Anton, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "@/app/sprint.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sprint-display",
  display: "swap",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sprint-condensed",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sprint-mono",
  display: "swap",
});

export default function TheSprintLayout({ children }: LayoutProps<"/the-sprint">) {
  return (
    <div className={`${anton.variable} ${condensed.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
