import React, { useEffect, useState } from "react";
import { QueryResult } from "@/types/database";

interface TableSchemaViewerProps {
  activeTable: string;
  onSelectTable: (tableName: string) => void;
  executeQuery: (sql: string) => QueryResult;
}

interface TableInfo {
  name: string;
  columns: string[];
}

const TableSchemaViewer: React.FC<TableSchemaViewerProps> = ({
  activeTable,
  onSelectTable,
  executeQuery,
}) => {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [schema, setSchema] = useState<{ column: string; type: string; nullable: string }[]>([]);

  // Available tables in the database
  const tableNames = ["Customers", "Products", "Orders", "Order_Items"];

  // Get table schema on mount or when active table changes
  useEffect(() => {
    // Get schema for the selected table
    if (activeTable) {
      const schemaQuery = `PRAGMA table_info(${activeTable});`;
      const result = executeQuery(schemaQuery);
      
      if (result.results && result.results.length > 0) {
        const schemaData = result.results[0].values.map((row) => ({
          column: row[1] as string,
          type: row[2] as string,
          nullable: row[3] === 1 ? "NOT NULL" : "NULL",
        }));
        setSchema(schemaData);
      }
    }
  }, [activeTable, executeQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Available Tables</h3>
        <div className="flex flex-wrap gap-2">
          {tableNames.map((tableName) => (
            <button
              key={tableName}
              onClick={() => onSelectTable(tableName)}
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTable === tableName
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tableName}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Table Schema: {activeTable}</h3>
        <div className="bg-gray-50 rounded-md border overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Column
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nullable
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schema.map((col, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                    {col.column}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {col.type}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {col.nullable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Sample Queries</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => onSelectTable(activeTable)}
            className="block w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
          >
            SELECT * FROM {activeTable} LIMIT 10;
          </button>
          
          {activeTable === "Customers" && (
            <>
              <button
                onClick={() => {
                  const query = "SELECT first_name, last_name, email FROM Customers ORDER BY last_name;";
                  executeQuery(query);
                }}
                className="block w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
              >
                SELECT first_name, last_name, email FROM Customers ORDER BY last_name;
              </button>
            </>
          )}

          {activeTable === "Products" && (
            <>
              <button
                onClick={() => {
                  const query = "SELECT name, price FROM Products WHERE price > 50 ORDER BY price DESC;";
                  executeQuery(query);
                }}
                className="block w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
              >
                SELECT name, price FROM Products WHERE price > 50 ORDER BY price DESC;
              </button>
            </>
          )}

          {activeTable === "Orders" && (
            <>
              <button
                onClick={() => {
                  const query = "SELECT o.order_id, c.first_name, c.last_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id;";
                  executeQuery(query);
                }}
                className="block w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
              >
                SELECT o.order_id, c.first_name, c.last_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id;
              </button>
            </>
          )}

          {activeTable === "Order_Items" && (
            <>
              <button
                onClick={() => {
                  const query = "SELECT oi.order_id, p.name, oi.quantity, oi.price_each FROM Order_Items oi JOIN Products p ON oi.product_id = p.product_id;";
                  executeQuery(query);
                }}
                className="block w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700"
              >
                SELECT oi.order_id, p.name, oi.quantity, oi.price_each FROM Order_Items oi JOIN Products p ON oi.product_id = p.product_id;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableSchemaViewer;