import type { Metadata } from "next";
import { MembershipPage } from "../components/MembershipPage";
import { OS_PRODUCT } from "../components/constants";

export const metadata: Metadata = {
  title: OS_PRODUCT.metaTitle,
  description: OS_PRODUCT.metaDescription,
};

export default function OsPage() {
  return <MembershipPage />;
}
