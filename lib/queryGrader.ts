import { SqlResult } from "@/types/database";

export interface GradeResult {
  isCorrect: boolean;
  score: number; // 0-100
  feedback: string;
  hints?: string[];
  type: "success" | "error" | "warning" | "info";
}

export interface GradeOptions {
  expectedQuery?: string;
  expectedColumns?: string[];
  expectedRows?: number;
  mustContain?: string[];
  mustNotContain?: string[];
  caseSensitive?: boolean;
  customValidator?: (
    results: SqlResult[],
    userQuery: string
  ) => GradeResult | null;
  hints?: string[];
}

/**
 * Normalizes a SQL query string by removing extra whitespace and making it case insensitive
 */
export function normalizeQuery(
  query: string,
  caseSensitive: boolean = false
): string {
  let normalized = query.replace(/\s+/g, " ").trim();
  if (!caseSensitive) {
    normalized = normalized.toLowerCase();
  }
  return normalized;
}

/**
 * Grades a SQL query based on various criteria
 */
export function gradeQuery(
  userQuery: string,
  queryResults: SqlResult[] | null,
  hasError: boolean,
  options: GradeOptions
): GradeResult {
  // Handle query execution errors
  if (hasError) {
    return {
      isCorrect: false,
      score: 0,
      feedback:
        "Your query has syntax or execution errors. Please check your SQL syntax.",
      hints: options.hints || ["Make sure your SQL syntax is correct."],
      type: "error",
    };
  }

  // No results when results were expected
  if (!queryResults || queryResults.length === 0) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "Your query executed but didn't return any results.",
      hints: options.hints || [
        "Check if your query conditions might be too restrictive.",
      ],
      type: "warning",
    };
  }

  // Try custom validator if provided
  if (options.customValidator && queryResults) {
    const customResult = options.customValidator(queryResults, userQuery);
    if (customResult) return customResult;
  }

  // Check for exact query match if expected query is provided
  if (options.expectedQuery) {
    const normalizedUserQuery = normalizeQuery(
      userQuery,
      options.caseSensitive
    );
    const normalizedExpectedQuery = normalizeQuery(
      options.expectedQuery,
      options.caseSensitive
    );

    if (normalizedUserQuery === normalizedExpectedQuery) {
      return {
        isCorrect: true,
        score: 100,
        feedback: "Perfect! Your query exactly matches the expected solution.",
        type: "success",
      };
    }
  }

  // Check for required terms in the query
  if (options.mustContain && options.mustContain.length > 0) {
    const normalizedUserQuery = normalizeQuery(
      userQuery,
      options.caseSensitive
    );
    const missingTerms = options.mustContain.filter((term) => {
      const normalizedTerm = options.caseSensitive ? term : term.toLowerCase();
      return !normalizedUserQuery.includes(normalizedTerm);
    });

    if (missingTerms.length > 0) {
      return {
        isCorrect: false,
        score: 40,
        feedback: `Your query is missing some important elements.`,
        hints: [`Make sure your query includes: ${missingTerms.join(", ")}`],
        type: "warning",
      };
    }
  }

  // Check for forbidden terms in the query
  if (options.mustNotContain && options.mustNotContain.length > 0) {
    const normalizedUserQuery = normalizeQuery(
      userQuery,
      options.caseSensitive
    );
    const forbiddenTerms = options.mustNotContain.filter((term) => {
      const normalizedTerm = options.caseSensitive ? term : term.toLowerCase();
      return normalizedUserQuery.includes(normalizedTerm);
    });

    if (forbiddenTerms.length > 0) {
      return {
        isCorrect: false,
        score: 30,
        feedback: `Your query contains elements that shouldn't be used for this exercise.`,
        hints: [`Avoid using: ${forbiddenTerms.join(", ")}`],
        type: "warning",
      };
    }
  }

  // Check for expected columns
  if (options.expectedColumns && queryResults && queryResults[0]) {
    const resultColumns = queryResults[0].columns.map((col) =>
      options.caseSensitive ? col : col.toLowerCase()
    );
    const expectedColumns = options.expectedColumns.map((col) =>
      options.caseSensitive ? col : col.toLowerCase()
    );

    const missingColumns = expectedColumns.filter(
      (col) => !resultColumns.includes(col)
    );
    const extraColumns = resultColumns.filter(
      (col) => !expectedColumns.includes(col)
    );

    if (missingColumns.length > 0) {
      return {
        isCorrect: false,
        score: 50,
        feedback: `Your query is missing some required columns.`,
        hints: [`Make sure to include columns: ${missingColumns.join(", ")}`],
        type: "warning",
      };
    }

    if (extraColumns.length > 0 && expectedColumns.length > 0) {
      return {
        isCorrect: false,
        score: 70,
        feedback: `Your query returned additional columns that weren't required.`,
        hints: [
          `Your query works but could be more precise. Try selecting only the specific columns needed.`,
        ],
        type: "info",
      };
    }
  }

  // Check for expected row count
  if (options.expectedRows !== undefined && queryResults && queryResults[0]) {
    const rowCount = queryResults[0].values.length;

    if (rowCount !== options.expectedRows) {
      return {
        isCorrect: false,
        score: 60,
        feedback: `Your query returned ${rowCount} rows, but we expected ${options.expectedRows}.`,
        hints: [
          `Check your WHERE clause conditions or JOINs. You might be filtering too much or too little.`,
        ],
        type: "warning",
      };
    }
  }

  // If we've made it this far and there are results, consider it partially correct
  return {
    isCorrect: true,
    score: 90,
    feedback: "Your query works and returns valid results!",
    type: "success",
  };
}

/**
 * Common SQL query validators
 */
export const validators = {
  // Validates the exact structure of results - column names and row count
  exactResults: (
    expectedColumns: string[],
    expectedRows: number
  ): GradeOptions => ({
    expectedColumns,
    expectedRows,
  }),

  // For SELECT queries, checks key SQL components
  basicSelect: (
    requiredTables: string[] = [],
    requiredColumns: string[] = []
  ): GradeOptions => ({
    mustContain: ["SELECT", ...requiredTables, ...requiredColumns],
  }),

  // For filtering queries, ensures WHERE clause is present
  filtering: (requiredConditions: string[] = []): GradeOptions => ({
    mustContain: ["WHERE", ...requiredConditions],
  }),

  // For JOIN queries
  joining: (
    joinType: "INNER JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL JOIN",
    tables: string[]
  ): GradeOptions => ({
    mustContain: [joinType, ...tables, "ON"],
  }),

  // For aggregation queries
  aggregation: (
    functions: string[] = ["COUNT", "SUM", "AVG", "MIN", "MAX"],
    groupBy: boolean = false
  ): GradeOptions => ({
    mustContain: [...functions, ...(groupBy ? ["GROUP BY"] : [])],
  }),
};
