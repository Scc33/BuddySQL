import React from "react";
import { SqlResult } from "@/types/database";
import { ResultTable } from "@/components/lessons/ResultTable";

interface SelectOperationProps {
  results: SqlResult | null;
}

const SelectOperation: React.FC<SelectOperationProps> = ({ results }) => {
  if (!results) {
    return <div>No results available</div>;
  }

  // Example query that's being visualized
  const exampleQuery =
    "SELECT customer_id, first_name, last_name, email FROM Customers LIMIT 5;";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          SELECT Operation
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm font-mono">{exampleQuery}</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual explanation */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">
              How SELECT Works
            </h3>
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                {/* Visual database table representation */}
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-lg transform -rotate-3"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-200 rounded-lg transform rotate-1"></div>
                  <div className="relative bg-white rounded-lg shadow-md border border-blue-300 p-4">
                    <div className="text-center font-semibold text-blue-800 mb-2">
                      Customers Table
                    </div>
                    <div className="flex space-x-1 mb-2">
                      <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                        customer_id
                      </div>
                      <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                        first_name
                      </div>
                      <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                        last_name
                      </div>
                      <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                        email
                      </div>
                      <div className="flex-1 bg-gray-100 p-1 rounded font-medium text-xs text-center text-gray-400">
                        join_date
                      </div>
                      <div className="flex-1 bg-gray-100 p-1 rounded font-medium text-xs text-center text-gray-400">
                        phone
                      </div>
                    </div>
                    <div className="text-center text-blue-800 text-sm italic">
                      Selects specific columns...
                    </div>
                  </div>
                </div>

                {/* Arrow pointing down */}
                <div className="flex justify-center my-4">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </svg>
                </div>

                {/* Result set */}
                <div className="bg-white rounded-lg shadow-md border border-blue-300 p-4">
                  <div className="text-center font-semibold text-blue-800 mb-2">
                    Result Set
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                      customer_id
                    </div>
                    <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                      first_name
                    </div>
                    <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                      last_name
                    </div>
                    <div className="flex-1 bg-blue-100 p-1 rounded font-medium text-xs text-center">
                      email
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-blue-800">
              <p className="font-semibold text-lg">
                SELECT acts like a projector of data
              </p>
              <p>
                The SELECT statement determines which{" "}
                <span className="font-semibold">columns</span> will appear in
                your query results. Think of it as a spotlight that illuminates
                only the specific data attributes you want to see.
              </p>
              <p>In our example:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-blue-100 px-1 rounded">
                    customer_id, first_name, last_name, email
                  </code>{" "}
                  - These are the columns we&apos;re selecting
                </li>
                <li>
                  <code className="bg-blue-100 px-1 rounded">
                    FROM Customers
                  </code>{" "}
                  - The table we&apos;re selecting from
                </li>
                <li>
                  <code className="bg-blue-100 px-1 rounded">LIMIT 5</code> -
                  Restricts the output to only 5 rows
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Key Concepts</h3>
            <div className="space-y-3">
              <div className="flex">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-800 font-bold flex-shrink-0 mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Column Selection</p>
                  <p className="text-sm text-gray-600">
                    Choose specific columns instead of using{" "}
                    <code>SELECT *</code> to improve query performance and
                    readability
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-800 font-bold flex-shrink-0 mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">Column Order</p>
                  <p className="text-sm text-gray-600">
                    Columns appear in results in the same order specified in the
                    SELECT statement
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-800 font-bold flex-shrink-0 mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Column Aliases</p>
                  <p className="text-sm text-gray-600">
                    You can rename columns using <code>AS</code> for more
                    meaningful output (e.g.,{" "}
                    <code>first_name AS &quot;First Name&quot;</code>)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Query Results */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h3 className="font-medium">Query Results</h3>
            </div>
            <div className="p-4">
              <ResultTable results={results} />
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">
              SQL Query Execution Order
            </h3>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                1
              </div>
              <div className="text-gray-600">FROM Customers</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-xs mr-2">
                2
              </div>
              <div className="font-semibold text-blue-800">
                SELECT customer_id, first_name, last_name, email
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                3
              </div>
              <div className="text-gray-600">LIMIT 5</div>
            </div>
            <p className="mt-4 text-xs text-blue-600 italic">
              Note: This shows conceptual execution order, not the order in
              which SQL is written!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOperation;
