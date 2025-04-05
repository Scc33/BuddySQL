"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AlphabeticalIndex from "@/components/glossary/AlphabeticalIndex";
import GlossaryFilters from "@/components/glossary/GlossaryFilters";
import GlossaryTermList from "@/components/glossary/GlossaryTermList";
import SearchBar from "@/components/glossary/SearchBar";
import { GlossaryTerm } from "@/types/glossary";
import {
  getAllGlossaryTerms,
  getGlossaryTermsByCategory,
  searchGlossaryTerms,
  getAlphabeticalIndex,
} from "@/lib/glossaryData";

export default function GlossaryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
  const [alphabetIndex, setAlphabetIndex] = useState<Record<string, number>>(
    {}
  );
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the index
    setAlphabetIndex(getAlphabeticalIndex());

    // Get initial terms
    let terms: GlossaryTerm[];

    if (searchQuery.trim()) {
      terms = searchGlossaryTerms(searchQuery);
    } else if (activeLetter) {
      terms = getAllGlossaryTerms().filter((term) =>
        term.title.toUpperCase().startsWith(activeLetter)
      );
      if (activeCategory !== "all") {
        terms = terms.filter((term) => term.category === activeCategory);
      }
    } else {
      terms = getGlossaryTermsByCategory(activeCategory);
    }

    setFilteredTerms(terms);
  }, [searchQuery, activeCategory, activeLetter]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveLetter(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveLetter(null);
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter === activeLetter ? null : letter);
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SQL Glossary</h1>
          <p className="mt-2 text-lg text-gray-500">
            A reference guide to SQL commands, clauses, concepts, and
            terminology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchBar onSearch={handleSearch} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filter by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <GlossaryFilters
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alphabetical Index</CardTitle>
              </CardHeader>
              <CardContent>
                <AlphabeticalIndex
                  index={alphabetIndex}
                  activeLetter={activeLetter}
                  onLetterClick={handleLetterClick}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content with glossary terms */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {searchQuery
                    ? `Search Results: ${filteredTerms.length} terms found`
                    : activeLetter
                    ? `Terms starting with '${activeLetter}'`
                    : activeCategory === "all"
                    ? "All SQL Terms"
                    : `${
                        activeCategory.charAt(0).toUpperCase() +
                        activeCategory.slice(1)
                      }s`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GlossaryTermList terms={filteredTerms} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
