import React from "react";
import { ParsedQuery } from "@/lib/queryParser";

interface VisualizationExplainerProps {
  query: string;
  queryType: string | null;
  parsedQuery: ParsedQuery | null;
  resultCount: number;
}

const VisualizationExplainer: React.FC<VisualizationExplainerProps> = ({
  query,
  queryType,
  parsedQuery,
  resultCount,
}) => {
  if (!parsedQuery) {
    return (
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-500 text-center">
        Execute a query to see its explanation
      </div>
    );
  }

  const renderSelectExplanation = () => {
    if (!parsedQuery) return null;

    const parts = [];

    // FROM explanation
    parts.push(
      <div key="from" className="mb-4">
        <h3 className="text-lg font-semibold mb-2">FROM</h3>
        <p>
          The query starts by accessing the table(s):{" "}
          <span className="font-mono bg-gray-100 px-1 rounded">
            {parsedQuery.from.tables.join(", ")}
          </span>
          .{" "}
          {parsedQuery.from.tables.length > 1 &&
            "Multiple tables are specified, which will be combined."}
        </p>
      </div>
    );

    // JOIN explanation
    if (parsedQuery.join && parsedQuery.join.length > 0) {
      parts.push(
        <div key="join" className="mb-4">
          <h3 className="text-lg font-semibold mb-2">JOIN</h3>
          <p>
            The query combines data from multiple tables using{" "}
            {parsedQuery.join.map((join, idx) => (
              <span key={idx}>
                <span className="font-mono bg-purple-100 px-1 rounded">
                  {join.type} JOIN
                </span>{" "}
                on the condition{" "}
                <span className="font-mono bg-purple-100 px-1 rounded">
                  {join.on}
                </span>
                {idx < parsedQuery.join!.length - 1 ? " and " : ""}
              </span>
            ))}
            . Joins connect related data across tables based on matching values.
          </p>
        </div>
      );
    }

    // WHERE explanation
    if (parsedQuery.where) {
      parts.push(
        <div key="where" className="mb-4">
          <h3 className="text-lg font-semibold mb-2">WHERE</h3>
          <p>
            The data is filtered using the condition:{" "}
            <span className="font-mono bg-yellow-100 px-1 rounded">
              {parsedQuery.where.conditions.join(" AND ")}
            </span>
            . Only rows that satisfy this condition are included in the results.
          </p>
        </div>
      );
    }

    // GROUP BY explanation
    if (parsedQuery.groupBy) {
      parts.push(
        <div key="groupby" className="mb-4">
          <h3 className="text-lg font-semibold mb-2">GROUP BY</h3>
          <p>
            The results are grouped by{" "}
            <span className="font-mono bg-green-100 px-1 rounded">
              {parsedQuery.groupBy.columns.join(", ")}
            </span>
            . This means rows with the same values in these columns are
            combined, allowing for aggregate functions like COUNT, SUM, AVG to
            compute summaries for each group.
          </p>
        </div>
      );
    }

    // ORDER BY explanation
    if (parsedQuery.orderBy) {
      parts.push(
        <div key="orderby" className="mb-4">
          <h3 className="text-lg font-semibold mb-2">ORDER BY</h3>
          <p>
            The results are sorted by{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">
              {parsedQuery.orderBy.columns.join(", ")}
            </span>{" "}
            in{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">
              {parsedQuery.orderBy.direction}
            </span>{" "}
            order. This determines the sequence in which rows appear in the
            final result.
          </p>
        </div>
      );
    }

    // LIMIT explanation
    if (parsedQuery.limit !== undefined) {
      parts.push(
        <div key="limit" className="mb-4">
          <h3 className="text-lg font-semibold mb-2">LIMIT</h3>
          <p>
            The query returns a maximum of{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">
              {parsedQuery.limit}
            </span>{" "}
            rows
            {parsedQuery.offset !== undefined && (
              <>
                {", starting from position "}
                <span className="font-mono bg-gray-100 px-1 rounded">
                  {parsedQuery.offset + 1}
                </span>
              </>
            )}
            . This controls the size of the result set.
          </p>
        </div>
      );
    }

    // SELECT explanation (positioned last in explanation but usually first in execution)
    parts.push(
      <div key="select" className="mb-4">
        <h3 className="text-lg font-semibold mb-2">SELECT</h3>
        <p>
          {parsedQuery.select.allColumns
            ? "All columns (*) are selected from the specified table(s)."
            : `The query selects the specific columns: `}
          {!parsedQuery.select.allColumns && (
            <span className="font-mono bg-blue-100 px-1 rounded">
              {parsedQuery.select.columns.join(", ")}
            </span>
          )}
          {". "}
          The final result contains {resultCount} row
          {resultCount !== 1 ? "s" : ""}.
        </p>
      </div>
    );

    return parts;
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Query Execution Flow</h3>
        <p className="text-sm text-gray-600 mb-4">
          SQL queries are conceptually executed in a specific order, different
          from how they're written. Here's how your query is processed:
        </p>

        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>FROM</strong>: Database identifies which table(s) to query
          </li>
          {parsedQuery.join && parsedQuery.join.length > 0 && (
            <li>
              <strong>JOIN</strong>: Tables are combined based on the specified
              conditions
            </li>
          )}
          {parsedQuery.where && (
            <li>
              <strong>WHERE</strong>: Rows are filtered based on conditions
            </li>
          )}
          {parsedQuery.groupBy && (
            <li>
              <strong>GROUP BY</strong>: Rows are grouped for aggregation
            </li>
          )}
          <li>
            <strong>SELECT</strong>: Specified columns are retrieved
          </li>
          {parsedQuery.orderBy && (
            <li>
              <strong>ORDER BY</strong>: Results are sorted
            </li>
          )}
          {parsedQuery.limit !== undefined && (
            <li>
              <strong>LIMIT/OFFSET</strong>: Result set is restricted to
              specified rows
            </li>
          )}
        </ol>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Step-by-Step Explanation</h3>
        {parsedQuery.type === "SELECT" ? (
          renderSelectExplanation()
        ) : (
          <p>
            Explanation for {parsedQuery.type} queries is not yet supported.
          </p>
        )}
      </div>
    </div>
  );
};

export default VisualizationExplainer;
