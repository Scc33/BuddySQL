import { Metadata } from "next";
import { defaultMetadata } from "../sitemapmetadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "SQL Glossary - SQL Terms and Definitions",
  description:
    "A comprehensive glossary of SQL terms, commands, clauses, and concepts to help you understand database querying language",
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
