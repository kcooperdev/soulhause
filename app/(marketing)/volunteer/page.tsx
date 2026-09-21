import type { Metadata } from "next";
import { VolunteerPage } from "@/components/VolunteerPage";
import { volunteer } from "@/lib/offerings";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${volunteer.name} · ${brand.name}`,
  description: volunteer.line,
};

export default function Page() {
  return <VolunteerPage />;
}
