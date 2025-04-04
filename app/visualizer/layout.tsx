import { Metadata } from "next";
import { defaultMetadata } from "../sitemapmetadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "SQL Query Visualizer - See Your Queries in Action",
  description:
    "Visualize how SQL queries interact with databases through interactive diagrams and visual explanations",
};

export default function VisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
