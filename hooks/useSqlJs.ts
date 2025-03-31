// hooks/useSqlJs.ts
"use client";

import { useState, useEffect } from "react";
import { QueryResult, SqlResult } from "@/types/database";

export function useSqlJs() {
  const [SQL, setSQL] = useState<any>(null);
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSql() {
      try {
        setIsLoading(true);

        // Check if the sql.js script is already loaded
        if (!(window as any).initSqlJs) {
          // Load the SQL.js script from CDN
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
          script.async = true;

          // Wait for the script to load
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () =>
              reject(new Error("Failed to load SQL.js script"));
            document.head.appendChild(script);
          });
        }

        // Initialize SQL.js
        const SQL = await (window as any).initSqlJs({
          locateFile: (file) =>
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
        });

        // Create a new database
        const db = new SQL.Database();

        setSQL(SQL);
        setDb(db);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize SQL.js:", err);
        setError("Failed to load SQL engine. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    }

    initializeSql();

    // Cleanup function
    return () => {
      if (db) {
        try {
          db.close();
        } catch (err) {
          console.error("Error closing database:", err);
        }
      }
    };
  }, []);

  // Function to execute SQL queries
  const executeQuery = (sql: string): QueryResult => {
    if (!db) {
      return { results: null, error: { message: "Database not initialized" } };
    }

    try {
      const start = performance.now();
      const results = db.exec(sql);
      const end = performance.now();

      return {
        results,
        error: null,
        executionTime: parseFloat((end - start).toFixed(2)),
      };
    } catch (err: any) {
      return {
        results: null,
        error: {
          message: err.message || "An error occurred while executing the query",
          code: err.code,
        },
      };
    }
  };

  // Function to initialize a database with sample data
  const initializeDatabase = (sqlStatements: string): boolean => {
    if (!db) return false;

    try {
      db.run(sqlStatements);
      return true;
    } catch (err) {
      console.error("Error initializing database with sample data:", err);
      return false;
    }
  };

  return {
    SQL,
    db,
    isLoading,
    error,
    executeQuery,
    initializeDatabase,
  };
}
