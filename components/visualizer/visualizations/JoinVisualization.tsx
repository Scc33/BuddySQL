import React from "react";

interface JoinVisualizationProps {
  joins: Array<{
    type: string;
    table: string;
    on: string;
  }>;
  tables: string[];
}

const JoinVisualization: React.FC<JoinVisualizationProps> = ({
  joins,
  tables,
}) => {
  // Get the main table (first table in the FROM clause)
  const mainTable = tables[0];

  // Helper to get join type description
  const getJoinTypeDescription = (type: string) => {
    switch (type.toUpperCase()) {
      case "INNER":
        return "Includes rows that match in both tables";
      case "LEFT":
        return "Includes all rows from the left table, plus matching rows from the right table";
      case "RIGHT":
        return "Includes all rows from the right table, plus matching rows from the left table";
      case "FULL":
        return "Includes all rows from both tables";
      default:
        return "Joins tables";
    }
  };

  // Helper to get join type color
  const getJoinTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "INNER":
        return "bg-purple-100 border-purple-400";
      case "LEFT":
        return "bg-blue-100 border-blue-400";
      case "RIGHT":
        return "bg-green-100 border-green-400";
      case "FULL":
        return "bg-indigo-100 border-indigo-400";
      default:
        return "bg-gray-100 border-gray-400";
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-purple-800 mb-2">
          Starting with table <span className="font-semibold">{mainTable}</span>{" "}
          and combining with:
        </p>
        <div className="space-y-4">
          {joins.map((join, idx) => (
            <div key={idx} className="space-y-2">
              <div
                className={`border-l-4 rounded-md p-2 text-purple-800 ${getJoinTypeColor(
                  join.type
                )}`}
              >
                <div className="text-sm font-semibold">
                  {join.type.toUpperCase()} JOIN with {join.table}
                </div>
                <div className="text-xs">
                  {getJoinTypeDescription(join.type)}
                </div>
              </div>
              <div className="bg-purple-50 p-2 rounded-md">
                <div className="text-xs text-purple-800 mb-1">
                  Join Condition:
                </div>
                <code className="text-xs font-mono text-purple-900 bg-purple-100 px-1 py-0.5 rounded">
                  {join.on}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex mt-2">
        <div className="flex-shrink-0 mr-2">
          <svg
            className="h-5 w-5 text-purple-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="text-sm text-purple-700 italic">
          JOINs combine rows from two or more tables based on related columns,
          creating a unified result set.
        </div>
      </div>
    </div>
  );
};

export default JoinVisualization;
