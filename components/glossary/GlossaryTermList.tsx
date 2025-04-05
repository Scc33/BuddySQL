import React from "react";
import Link from "next/link";
import { GlossaryTerm } from "@/types/glossary";

interface GlossaryTermListProps {
  terms: GlossaryTerm[];
}

const GlossaryTermList: React.FC<GlossaryTermListProps> = ({ terms }) => {
  // Group terms by first letter
  const groupedTerms: Record<string, GlossaryTerm[]> = {};

  terms.forEach((term) => {
    const firstLetter = term.title.charAt(0).toUpperCase();
    if (!groupedTerms[firstLetter]) {
      groupedTerms[firstLetter] = [];
    }
    groupedTerms[firstLetter].push(term);
  });

  // Get sorted letters
  const sortedLetters = Object.keys(groupedTerms).sort();

  // Styling for different term categories
  const categoryStyles: Record<string, string> = {
    command: "bg-blue-100 text-blue-800",
    clause: "bg-purple-100 text-purple-800",
    concept: "bg-green-100 text-green-800",
    function: "bg-yellow-100 text-yellow-800",
    operator: "bg-red-100 text-red-800",
  };

  if (terms.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No terms found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedLetters.map((letter) => (
        <div key={letter}>
          <div className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b">
            {letter}
          </div>
          <div className="space-y-4">
            {groupedTerms[letter].map((term) => (
              <Link
                key={term.id}
                href={`/glossary/${term.slug}`}
                className="block p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {term.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      categoryStyles[term.category]
                    }`}
                  >
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2">{term.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlossaryTermList;
