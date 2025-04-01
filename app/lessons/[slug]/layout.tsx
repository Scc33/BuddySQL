import { Metadata } from "next";
import { getLessonBySlug } from "@/lib/lessons";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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
