"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SqlEditor } from "@/components/lessons/SqlEditor";
import { initializeDatabase } from "@/lib/lessons";
import { useSqlJs } from "@/hooks/useSqlJs";
import Loading from "@/components/ui/loading";
import TableSchemaViewer from "@/components/sandbox/TableSchemaViewer";

export default function SandboxPage() {
  const [dbInitialized, setDbInitialized] = useState(false);

  const {
    isLoading,
    error,
    executeQuery,
    initializeDatabase: initDb,
    db,
  } = useSqlJs();

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
    const result = executeQuery(sql);
    return result;
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
          <h1 className="text-3xl font-bold text-gray-900">SQL Sandbox</h1>
          <p className="mt-2 text-lg text-gray-500">
            Experiment freely with SQL queries on our sample e-commerce
            database. Try selecting, filtering, joining, and more!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
              </CardHeader>
              <CardContent>
                <TableSchemaViewer executeQuery={executeQuery} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>SQL Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Write and execute SQL queries against the sample database. Try
                  exploring the different tables!
                </p>
                <SqlEditor
                  initialQuery={"SELECT * FROM Customers LIMIT 10;"}
                  onExecuteQuery={handleExecuteQuery}
                  disableFeedback={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
