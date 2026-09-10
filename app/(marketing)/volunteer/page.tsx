import type { Metadata } from "next";
import { VolunteerPage } from "@/components/VolunteerPage";
import { volunteer } from "@/lib/offerings";

export const metadata: Metadata = {
  title: `${volunteer.name} · SoulHause`,
  description: volunteer.line,
};

export default function Page() {
  return <VolunteerPage />;
}
