import type { Metadata, Viewport } from "next";
import { FormatPage } from "../components/FormatPage";
import { formatPageById } from "../components/constants";

const page = formatPageById("sessions");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export const viewport: Viewport = {
  themeColor: "#E9EBE7",
};

export default function SessionsPage() {
  return <FormatPage id="sessions" />;
}
