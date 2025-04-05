import { Metadata } from "next";
import { getGlossaryTermBySlug } from "@/lib/glossaryData";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const term = getGlossaryTermBySlug(params.slug);

  if (!term) {
    return {};
  }

  const title = `${term.title} - SQL Glossary | SQL Playground`;
  const description = term.description;

  // Create category-specific keywords
  const categoryKeywords =
    {
      command: ["SQL command", "SQL syntax", "database command"],
      clause: ["SQL clause", "SQL syntax", "query clause"],
      concept: ["SQL concept", "database concept", "SQL terminology"],
      function: ["SQL function", "database function", "SQL aggregate function"],
      operator: ["SQL operator", "database operator", "comparison operator"],
    }[term.category] || [];

  return {
    title,
    description,
    keywords: [
      term.title,
      `SQL ${term.title}`,
      `${term.title} in SQL`,
      `${term.title} SQL example`,
      `${term.title} definition`,
      ...categoryKeywords,
    ],
    openGraph: {
      title,
      description,
      url: `https://buddysql.seancoughlin.me/glossary/${term.slug}`,
      type: "article",
      images: [
        {
          url: "/images/sql-playground-og.png",
          width: 1200,
          height: 630,
          alt: "SQL Playground",
        },
      ],
    },
    alternates: {
      canonical: `https://buddysql.seancoughlin.me/glossary/${term.slug}`,
    },
  };
}

export default function GlossaryTermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
