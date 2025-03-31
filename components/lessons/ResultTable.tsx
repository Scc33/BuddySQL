import React from "react";
import { SqlResult } from "@/types/database";

interface ResultTableProps {
  results: SqlResult;
}

export const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  if (!results || !results.columns || !results.values) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {results.columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.values.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell === null ? (
                    <span className="text-gray-400 italic">NULL</span>
                  ) : (
                    String(cell)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {results.values.length === 0 && (
        <div className="py-4 text-center text-gray-500">
          Query returned 0 rows.
        </div>
      )}

      {results.values.length > 0 && (
        <div className="py-2 px-4 text-right text-xs text-gray-500 border-t">
          {results.values.length} row{results.values.length !== 1 ? "s" : ""}{" "}
          returned
        </div>
      )}
    </div>
  );
};
