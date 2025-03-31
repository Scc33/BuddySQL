"use client";

import React, { useState, useEffect } from "react";
import { QueryResult } from "@/types/database";
import { ResultTable } from "./ResultTable";

interface SqlEditorProps {
  initialQuery: string;
  onExecuteQuery: (sql: string) => QueryResult;
  onSaveProgress?: (query: string, success?: boolean) => void;
  expectedQuery?: string;
  children?: React.ReactNode;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  initialQuery,
  onExecuteQuery,
  onSaveProgress,
  expectedQuery,
  children,
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [queryResult, setQueryResult] = useState<QueryResult>({
    results: null,
    error: null,
  });
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialQuery && !query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query]);

  const executeQuery = () => {
    setIsLoading(true);

    try {
      const result = onExecuteQuery(query);
      setQueryResult(result);

      if (expectedQuery) {
        // Simple query validation - strip whitespace and make case insensitive
        const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim();
        const normalizedExpected = expectedQuery
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();

        const success =
          normalizedQuery === normalizedExpected ||
          (!result.error && result.results && result.results.length > 0);

        setIsSuccess(success);

        if (onSaveProgress) {
          onSaveProgress(query, success);
        }
      }
    } catch (err) {
      console.error("Error executing query:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Execute query on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      executeQuery();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-32 p-3 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your SQL query here..."
        />
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Press Ctrl+Enter to run query
          </div>
          <button
            onClick={executeQuery}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Running..." : "Run Query"}
          </button>
        </div>
      </div>

      {children}

      <div className="p-4">
        {queryResult.error ? (
          <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
            <p className="font-semibold">Error:</p>
            <p className="font-mono text-sm">{queryResult.error.message}</p>
          </div>
        ) : queryResult.results && queryResult.results.length > 0 ? (
          <div>
            {queryResult.executionTime && (
              <div className="mb-2 text-sm text-gray-500">
                Query executed in {queryResult.executionTime}ms
              </div>
            )}
            <ResultTable results={queryResult.results[0]} />
          </div>
        ) : (
          <div className="p-4 text-gray-500 text-center border border-dashed border-gray-300 rounded-md">
            {queryResult.results
              ? "Query executed successfully but returned no results."
              : "Run a query to see results."}
          </div>
        )}

        {isSuccess !== null && (
          <div
            className={`mt-4 p-3 rounded-md ${
              isSuccess
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <p
              className={`font-medium ${
                isSuccess ? "text-green-800" : "text-yellow-800"
              }`}
            >
              {isSuccess
                ? "✓ Success! Your query is correct."
                : "× Almost there! Try again with a different query."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
