import { Metadata } from "next";
import { defaultMetadata } from "../sitemapmetadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "SQL Sandbox - Free-form SQL Query Editor",
  description:
    "Practice and experiment with SQL queries in a consequence-free environment with our sample e-commerce database",
};

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
