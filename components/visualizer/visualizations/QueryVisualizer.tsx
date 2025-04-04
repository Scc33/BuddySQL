import React from "react";
import { SqlResult } from "@/types/database";
import { ParsedQuery } from "@/lib/queryParser";
import { ResultTable } from "@/components/lessons/ResultTable";
import SelectVisualization from "./SelectVisualization";
import JoinVisualization from "./JoinVisualization";
import GroupByVisualization from "./GroupByVisualization";
import WhereVisualization from "./WhereVisualization";

interface QueryVisualizerProps {
  queryResults: SqlResult;
  queryType: string | null;
  parsedQuery: ParsedQuery | null;
}

const QueryVisualizer: React.FC<QueryVisualizerProps> = ({
  queryResults,
  queryType,
  parsedQuery,
}) => {
  if (!queryResults || !parsedQuery) {
    return (
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-500 text-center">
        Execute a query to see its visualization
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization panels based on query type */}
        <div className="space-y-4">
          {parsedQuery.type === "SELECT" && (
            <>
              {/* SELECT Visualization */}
              <div className="border border-blue-100 rounded-md bg-blue-50 p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  SELECT Operation
                </h3>
                <SelectVisualization
                  columns={parsedQuery.select.columns}
                  allColumns={parsedQuery.select.allColumns}
                  tables={parsedQuery.from.tables}
                />
              </div>

              {/* WHERE Visualization */}
              {parsedQuery.where && (
                <div className="border border-yellow-100 rounded-md bg-yellow-50 p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    WHERE Conditions
                  </h3>
                  <WhereVisualization
                    conditions={parsedQuery.where.conditions}
                  />
                </div>
              )}

              {/* JOIN Visualization */}
              {parsedQuery.join && parsedQuery.join.length > 0 && (
                <div className="border border-purple-100 rounded-md bg-purple-50 p-4">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    JOIN Operation
                  </h3>
                  <JoinVisualization
                    joins={parsedQuery.join}
                    tables={parsedQuery.from.tables}
                  />
                </div>
              )}

              {/* GROUP BY Visualization */}
              {parsedQuery.groupBy && (
                <div className="border border-green-100 rounded-md bg-green-50 p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    GROUP BY Operation
                  </h3>
                  <GroupByVisualization
                    columns={parsedQuery.groupBy.columns}
                    selectColumns={parsedQuery.select.columns}
                  />
                </div>
              )}

              {/* ORDER BY Information */}
              {parsedQuery.orderBy && (
                <div className="border border-gray-200 rounded-md bg-gray-50 p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    ORDER BY
                  </h3>
                  <p>
                    Results are sorted by{" "}
                    <span className="font-mono bg-gray-100 px-1 rounded">
                      {parsedQuery.orderBy.columns.join(", ")}
                    </span>{" "}
                    in{" "}
                    <span className="font-mono bg-gray-100 px-1 rounded">
                      {parsedQuery.orderBy.direction}
                    </span>{" "}
                    order.
                  </p>
                </div>
              )}

              {/* LIMIT Information */}
              {parsedQuery.limit !== undefined && (
                <div className="border border-gray-200 rounded-md bg-gray-50 p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    LIMIT
                  </h3>
                  <p>
                    Results are limited to{" "}
                    <span className="font-mono bg-gray-100 px-1 rounded">
                      {parsedQuery.limit}
                    </span>{" "}
                    rows
                    {parsedQuery.offset !== undefined && (
                      <>
                        {" "}
                        starting from row{" "}
                        <span className="font-mono bg-gray-100 px-1 rounded">
                          {parsedQuery.offset + 1}
                        </span>
                      </>
                    )}
                    .
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Results display */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="font-medium">Query Results</h3>
            <div className="text-xs text-gray-500">
              {queryResults.values.length} rows returned
            </div>
          </div>
          <div className="max-h-80 overflow-auto">
            <ResultTable results={queryResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryVisualizer;
