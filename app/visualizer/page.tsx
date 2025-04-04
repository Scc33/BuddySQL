"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { initializeDatabase } from "@/lib/lessons";
import { useSqlJs } from "@/hooks/useSqlJs";
import Loading from "@/components/ui/loading";
import { SqlResult } from "@/types/database";
import { parseQuery } from "@/lib/queryParser";
import Image from "next/image";

// SQL operation visualizations
import SelectOperation from "@/components/visualizer/operations/SelectOperation";
import WhereOperation from "@/components/visualizer/operations/WhereOperation";
import JoinOperation from "@/components/visualizer/operations/JoinOperation";
import GroupByOperation from "@/components/visualizer/operations/GroupByOperation";

export default function VisualizerPage() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [activeOperation, setActiveOperation] = useState<string>("select");
  const [queryResults, setQueryResults] = useState<SqlResult | null>(null);

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

        // Run the initial SELECT query to show data on load
        handleOperationChange("select");
      }
    }
  }, [db, dbInitialized, initDb]);

  // Function to run a preset query for the selected operation
  const handleOperationChange = (operation: string) => {
    setActiveOperation(operation);

    let query = "";

    // Define preset queries for each operation
    switch (operation) {
      case "select":
        query =
          "SELECT customer_id, first_name, last_name, email FROM Customers LIMIT 5;";
        break;
      case "where":
        query =
          "SELECT name, price, category FROM Products WHERE price > 70 ORDER BY price DESC;";
        break;
      case "join":
        query =
          "SELECT c.first_name, c.last_name, o.order_date, o.total_amount FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id LIMIT 6;";
        break;
      case "groupby":
        query =
          "SELECT category, COUNT(*) as product_count, AVG(price) as avg_price FROM Products GROUP BY category;";
        break;
      default:
        query = "SELECT * FROM Customers LIMIT 5;";
    }

    // Execute the query
    const result = executeQuery(query);

    if (result.results && result.results.length > 0) {
      setQueryResults(result.results[0]);
    } else {
      setQueryResults(null);
    }
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
            Explore how different SQL operations transform data through visual
            explanations
          </p>
        </div>

        {/* Operation Selector */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold text-lg mb-4">
            Choose an SQL Operation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <OperationButton
              name="SELECT"
              description="Column Selection"
              isActive={activeOperation === "select"}
              onClick={() => handleOperationChange("select")}
              icon="/images/select-icon.svg"
              color="bg-blue-100 hover:bg-blue-200 text-blue-800"
            />
            <OperationButton
              name="WHERE"
              description="Row Filtering"
              isActive={activeOperation === "where"}
              onClick={() => handleOperationChange("where")}
              icon="/images/where-icon.svg"
              color="bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
            />
            <OperationButton
              name="JOIN"
              description="Table Combination"
              isActive={activeOperation === "join"}
              onClick={() => handleOperationChange("join")}
              icon="/images/join-icon.svg"
              color="bg-purple-100 hover:bg-purple-200 text-purple-800"
            />
            <OperationButton
              name="GROUP BY"
              description="Data Aggregation"
              isActive={activeOperation === "groupby"}
              onClick={() => handleOperationChange("groupby")}
              icon="/images/groupby-icon.svg"
              color="bg-green-100 hover:bg-green-200 text-green-800"
            />
          </div>
        </div>

        {/* Operation Visualization */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activeOperation === "select" && (
            <SelectOperation results={queryResults} />
          )}
          {activeOperation === "where" && (
            <WhereOperation results={queryResults} />
          )}
          {activeOperation === "join" && (
            <JoinOperation results={queryResults} />
          )}
          {activeOperation === "groupby" && (
            <GroupByOperation results={queryResults} />
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for operation selection buttons
interface OperationButtonProps {
  name: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  icon: string;
  color: string;
}

function OperationButton({
  name,
  description,
  isActive,
  onClick,
  icon,
  color,
}: OperationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg transition-all ${color} ${
        isActive ? "ring-2 ring-offset-2 ring-blue-500" : ""
      } flex items-center`}
    >
      <div className="w-10 h-10 flex-shrink-0 mr-3 flex items-center justify-center">
        <img src={icon} alt={`${name} icon`} width={32} height={32} />
      </div>
      <div className="text-left">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-xs opacity-80">{description}</p>
      </div>
    </button>
  );
}
