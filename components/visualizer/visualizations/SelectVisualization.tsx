import React from "react";

interface SelectVisualizationProps {
  columns: string[];
  allColumns: boolean;
  tables: string[];
}

const SelectVisualization: React.FC<SelectVisualizationProps> = ({
  columns,
  allColumns,
  tables,
}) => {
  return (
    <div className="space-y-3">
      {allColumns ? (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-200 flex items-center justify-center rounded-full mr-3 shrink-0">
            <span className="text-blue-700 font-bold">*</span>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              Selecting <span className="font-semibold">all columns</span> from{" "}
              {tables.length === 1 ? "the table" : "tables"} {tables.join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-blue-800 mb-2">
            Selecting{" "}
            <span className="font-semibold">
              {columns.length} specific column{columns.length !== 1 ? "s" : ""}
            </span>{" "}
            from {tables.length === 1 ? "the table" : "tables"}{" "}
            {tables.join(", ")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {columns.map((column, idx) => (
              <div
                key={idx}
                className="bg-blue-100 rounded-md p-2 text-blue-800 text-sm font-mono"
              >
                {column}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-sm text-blue-700 mt-2 italic">
        The SELECT clause determines which columns will appear in the final
        result.
      </div>
    </div>
  );
};

export default SelectVisualization;
