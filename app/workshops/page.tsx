import type { Metadata, Viewport } from "next";
import { FormatPage } from "../components/FormatPage";
import { formatPageById } from "../components/constants";

const page = formatPageById("workshops");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export const viewport: Viewport = {
  themeColor: "#E9EBE7",
};

export default function WorkshopsPage() {
  return <FormatPage id="workshops" />;
}
