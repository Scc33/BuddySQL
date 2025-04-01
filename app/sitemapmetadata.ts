import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "SQL Playground - Learn SQL in Your Browser",
    template: "%s | SQL Playground",
  },
  description:
    "Interactive SQL tutorials and exercises that help you learn SQL fundamentals with hands-on practice directly in your browser",
  keywords: [
    "learn SQL",
    "SQL tutorial",
    "SQL playground",
    "interactive SQL",
    "SQL basics",
    "SQL exercises",
    "database tutorial",
    "SQL practice",
  ],
  authors: [{ name: "Sean Coughlin" }],
  creator: "Sean Coughlin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buddysql.seancoughlin.me/",
    siteName: "SQL Playground",
    title: "SQL Playground - Learn SQL in Your Browser",
    description:
      "Interactive SQL tutorials and exercises to learn SQL fundamentals with hands-on practice",
    images: [
      {
        url: "/images/sql-playground-og.png",
        width: 1200,
        height: 630,
        alt: "SQL Playground",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Playground - Learn SQL in Your Browser",
    description:
      "Interactive SQL tutorials and exercises to learn SQL fundamentals with hands-on practice",
    images: ["/images/sql-playground-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
