"use client";

import { useState, useEffect } from "react";
import { QueryResult, SqlResult } from "@/types/database";
import { loadSqlJs } from "@/lib/loader";

export function useSqlJs() {
  const [SQL, setSQL] = useState<any>(null);
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSql() {
      try {
        setIsLoading(true);
        // Initialize SQL.js
        const SQL = await initSqlJs({
          locateFile: (file: string) => `/sql-wasm.wasm`,
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

  // Function to run SQL statements that don't return results
  const runSql = (
    sql: string
  ): { success: boolean; error: SqlResult | null } => {
    if (!db) {
      return { success: false, error: null };
    }

    try {
      db.run(sql);
      return { success: true, error: null };
    } catch (err: any) {
      return {
        success: false,
        error: {
          message: err.message || "Error executing SQL",
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
    runSql,
    initializeDatabase,
  };
}
