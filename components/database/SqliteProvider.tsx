"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSqlJs } from "@/hooks/useSqlJs";
import { QueryResult } from "@/types/database";

interface SqliteContextType {
  isLoading: boolean;
  error: string | null;
  executeQuery: (sql: string) => QueryResult;
  initializeDatabase: (sqlStatements: string) => boolean;
}

const SqliteContext = createContext<SqliteContextType | null>(null);

export function useSqlite(): SqliteContextType {
  const context = useContext(SqliteContext);
  if (!context) {
    throw new Error("useSqlite must be used within a SqliteProvider");
  }
  return context;
}

interface SqliteProviderProps {
  children: ReactNode;
}

export function SqliteProvider({ children }: SqliteProviderProps) {
  const { isLoading, error, executeQuery, initializeDatabase } = useSqlJs();

  const value = {
    isLoading,
    error,
    executeQuery,
    initializeDatabase,
  };

  return (
    <SqliteContext.Provider value={value}>{children}</SqliteContext.Provider>
  );
}

// Loading component to show while SQL.js is initializing
export function SqliteLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">
          Loading SQL engine...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a moment to initialize.
        </p>
      </div>
    </div>
  );
}

// Error component to show if SQL.js fails to load
export function SqliteError({ message }: { message: string }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Error Loading SQL Engine
      </h3>
      <p className="text-red-700">{message}</p>
      <p className="mt-4 text-red-600">
        Try refreshing the page or check your console for more details.
      </p>
    </div>
  );
}
