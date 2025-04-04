"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SqlEditor } from "@/components/lessons/SqlEditor";
import { initializeDatabase } from "@/lib/lessons";
import { useSqlJs } from "@/hooks/useSqlJs";
import Loading from "@/components/ui/loading";
import QueryVisualizer from "@/components/visualizer/visualizations/QueryVisualizer";
import VisualizationExplainer from "@/components/visualizer/VisualizationExplainer";
import { SqlResult } from "@/types/database";
import { parseQuery } from "@/lib/queryParser";

export default function VisualizerPage() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [queryType, setQueryType] = useState<string | null>(null);
  const [parsedQuery, setParsedQuery] = useState<any>(null);
  const [queryResults, setQueryResults] = useState<SqlResult | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const {
    isLoading,
    error,
    executeQuery,
    initializeDatabase: initDb,
    db,
  } = useSqlJs();

  // Initialize the database when component loads
  useEffect(() => {
    if (db && !dbInitialized) {
      const sql = initializeDatabase();
      const success = initDb(sql);
      if (success) {
        setDbInitialized(true);
      }
    }
  }, [db, dbInitialized, initDb]);

  const handleExecuteQuery = (sql: string) => {
    setCurrentQuery(sql);

    // Parse the query to determine its type and structure
    const parsed = parseQuery(sql);
    setParsedQuery(parsed);
    setQueryType(parsed.type);

    // Execute the query
    const result = executeQuery(sql);

    if (result.results && result.results.length > 0) {
      setQueryResults(result.results[0]);
    } else {
      setQueryResults(null);
    }

    return result;
  };

  const sampleQueries = {
    "Basic SELECT": "SELECT * FROM Customers LIMIT 5;",
    "Filtering (WHERE)": "SELECT name, price FROM Products WHERE price > 100;",
    "JOIN Example":
      "SELECT c.first_name, c.last_name, o.order_date, o.total_amount FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id LIMIT 5;",
    "GROUP BY":
      "SELECT category, COUNT(*) as count, AVG(price) as avg_price FROM Products GROUP BY category;",
    "Nested Query":
      "SELECT name, price FROM Products WHERE price > (SELECT AVG(price) FROM Products);",
  };

  const loadSampleQuery = (query: string) => {
    // We don't execute the query here, just set it in the editor
    // The user will need to click Run Query to execute it
    setCurrentQuery(query);
  };

  if (isLoading) {
    return (
      <Loading
        title="Loading SQL engine..."
        subtitle="This may take a moment to initialize"
      />
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error Loading SQL Engine
          </h3>
          <p className="text-red-700">{error}</p>
          <p className="mt-4 text-red-600">
            Try refreshing the page or check your console for more details.
          </p>
        </div>
      </div>
    );
  }

  if (!dbInitialized) {
    return <Loading title="Initializing database..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            SQL Query Visualizer
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Visualize how SQL queries work and understand the query execution
            process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>SQL Editor</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(sampleQueries).map(([name, query]) => (
                  <button
                    key={name}
                    onClick={() => loadSampleQuery(query)}
                    className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <SqlEditor
                initialQuery={
                  currentQuery || "SELECT * FROM Customers LIMIT 5;"
                }
                onExecuteQuery={handleExecuteQuery}
                disableFeedback={true}
              />
            </CardContent>
          </Card>

          {queryResults && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Query Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <QueryVisualizer
                    queryResults={queryResults}
                    queryType={queryType}
                    parsedQuery={parsedQuery}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Query Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <VisualizationExplainer
                    query={currentQuery}
                    queryType={queryType}
                    parsedQuery={parsedQuery}
                    resultCount={queryResults.values.length}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
