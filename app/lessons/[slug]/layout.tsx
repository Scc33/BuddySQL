import { Metadata } from "next";
import { getLessonBySlug } from "@/lib/lessons";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    return {};
  }

  return {
    title: lesson.title,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | SQL Playground`,
      description: lesson.description,
      images: [
        {
          url: "/images/sql-playground-og.png",
          width: 1200,
          height: 630,
          alt: "SQL Playground",
        },
      ],
    },
  };
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
