import React from "react";

interface WhereVisualizationProps {
  conditions: string[];
}

const WhereVisualization: React.FC<WhereVisualizationProps> = ({
  conditions,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-yellow-800 mb-2">
          Records must satisfy these conditions to be included in results:
        </p>
        <div className="space-y-2">
          {conditions.map((condition, idx) => (
            <div
              key={idx}
              className="bg-yellow-100 border-l-4 border-yellow-400 rounded-md p-2 text-yellow-800 text-sm font-mono"
            >
              {condition}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center mt-2">
        <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center rounded-full mr-3 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <div className="text-sm text-yellow-700 italic">
          The WHERE clause filters rows from the data source, eliminating rows
          that don't match your conditions.
        </div>
      </div>
    </div>
  );
};

export default WhereVisualization;
