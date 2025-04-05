"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getGlossaryTermBySlug, getRelatedTerms } from "@/lib/glossaryData";
import { GlossaryTerm } from "@/types/glossary";

export default function GlossaryTermPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [term, setTerm] = useState<GlossaryTerm | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<GlossaryTerm[]>([]);

  useEffect(() => {
    const termData = getGlossaryTermBySlug(slug);
    if (!termData) {
      notFound();
    }

    setTerm(termData);

    if (termData.id) {
      const related = getRelatedTerms(termData.id);
      setRelatedTerms(related);
    }
  }, [slug]);

  if (!term) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  const termColor = {
    command: "bg-blue-100 text-blue-800 border-blue-200",
    clause: "bg-purple-100 text-purple-800 border-purple-200",
    concept: "bg-green-100 text-green-800 border-green-200",
    function: "bg-yellow-100 text-yellow-800 border-yellow-200",
    operator: "bg-red-100 text-red-800 border-red-200",
  }[term.category];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/glossary"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Glossary
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{term.title}</CardTitle>
              <div className="flex items-center justify-end">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${termColor}`}
                >
                  {term.category.charAt(0).toUpperCase() +
                    term.category.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{term.description}</p>
              </div>

              {term.syntax && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Syntax
                  </h3>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                    {term.syntax}
                  </div>
                </div>
              )}

              {term.examples && term.examples.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Examples
                  </h3>
                  <div className="space-y-4">
                    {term.examples.map((example, index) => (
                      <div key={index}>
                        <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-2">
                          {example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Link to Sandbox instead of embedded SQL runner */}
              {term.examples && term.examples.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-blue-800">
                    Want to try this example?
                  </h3>
                  <p className="mb-4 text-blue-700">
                    Head over to our SQL Sandbox to experiment with this and
                    other SQL queries in a live environment.
                  </p>
                  <Link
                    href="/sandbox"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Go to SQL Sandbox
                    <svg
                      className="ml-2 -mr-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {relatedTerms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {relatedTerms.map((related) => (
                    <li key={related.id}>
                      <Link
                        href={`/glossary/${related.slug}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {related.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {related.category}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Further Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/lessons"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    SQL Lessons
                  </Link>
                  <p className="text-sm text-gray-500">
                    Practice SQL with interactive lessons
                  </p>
                </li>
                <li>
                  <Link
                    href="/sandbox"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    SQL Sandbox
                  </Link>
                  <p className="text-sm text-gray-500">
                    Experiment with SQL queries
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
