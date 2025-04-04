import React from "react";

interface GroupByVisualizationProps {
  columns: string[];
  selectColumns: string[];
}

const GroupByVisualization: React.FC<GroupByVisualizationProps> = ({
  columns,
  selectColumns,
}) => {
  // Detect if there are aggregate functions in the SELECT clause
  const hasAggregations = selectColumns.some((col) => {
    const lowerCol = col.toLowerCase();
    return (
      lowerCol.includes("count(") ||
      lowerCol.includes("sum(") ||
      lowerCol.includes("avg(") ||
      lowerCol.includes("min(") ||
      lowerCol.includes("max(")
    );
  });

  // Extract aggregate functions for display
  const aggregateFunctions = selectColumns
    .filter((col) => {
      const lowerCol = col.toLowerCase();
      return (
        lowerCol.includes("count(") ||
        lowerCol.includes("sum(") ||
        lowerCol.includes("avg(") ||
        lowerCol.includes("min(") ||
        lowerCol.includes("max(")
      );
    })
    .map((col) => {
      // Extract just the function name and its argument
      const match = col.match(/(\w+)\(([^)]+)\)(?:\s+as\s+(\w+))?/i);
      if (match) {
        return {
          function: match[1].toUpperCase(),
          column: match[2],
          alias: match[3] || null,
        };
      }
      return { function: col, column: "", alias: null };
    });

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-green-800 mb-2">
          Rows are grouped by{" "}
          {columns.length === 1 ? "this column" : "these columns"}:
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {columns.map((column, idx) => (
            <div
              key={idx}
              className="bg-green-100 rounded-md px-2 py-1 text-green-800 text-sm font-mono"
            >
              {column}
            </div>
          ))}
        </div>

        {hasAggregations && (
          <div className="mt-3">
            <p className="text-sm text-green-800 mb-2">
              Applying these aggregate functions for each group:
            </p>
            <div className="space-y-2">
              {aggregateFunctions.map((agg, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 border border-green-200 rounded-md p-2"
                >
                  <span className="font-semibold text-green-700">
                    {agg.function}
                  </span>
                  <span className="text-green-600">({agg.column})</span>
                  {agg.alias && (
                    <span className="text-green-500 text-xs ml-2">
                      → renamed as "{agg.alias}"
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start mt-2">
        <div className="w-10 h-10 bg-green-200 flex items-center justify-center rounded-full mr-3 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div className="text-sm text-green-700 italic">
          The GROUP BY clause collects rows with the same values into summary
          rows.
          {hasAggregations
            ? " This allows aggregate functions to calculate summary values for each group."
            : " Without aggregate functions, it's similar to using DISTINCT to remove duplicates."}
        </div>
      </div>
    </div>
  );
};

export default GroupByVisualization;
