import React from "react";
import { SqlResult } from "@/types/database";
import { ResultTable } from "@/components/lessons/ResultTable";

interface JoinOperationProps {
  results: SqlResult | null;
}

const JoinOperation: React.FC<JoinOperationProps> = ({ results }) => {
  if (!results) {
    return <div>No results available</div>;
  }

  // Example query that's being visualized
  const exampleQuery =
    "SELECT c.first_name, c.last_name, o.order_date, o.total_amount FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id LIMIT 6;";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          JOIN Operation
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm font-mono">{exampleQuery}</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual explanation */}
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 mb-4">
              How JOIN Works
            </h3>

            <div className="relative my-8">
              {/* Customers table representation */}
              <div className="w-48 bg-white rounded-lg shadow-md border border-purple-300 p-3 absolute left-0 top-0 z-10">
                <div className="text-center font-semibold text-purple-800 mb-2 text-sm">
                  Customers
                </div>
                <div className="mb-1">
                  <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                    customer_id
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      1
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      2
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      3
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                    name
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      John
                    </div>
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      Jane
                    </div>
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      Mike
                    </div>
                  </div>
                </div>
              </div>

              {/* Join lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 5 }}
              >
                <line
                  x1="50"
                  y1="50"
                  x2="calc(100% - 50)"
                  y2="50"
                  stroke="#9061F9"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle cx="50" cy="50" r="5" fill="#9061F9" />
                <circle cx="calc(100% - 50)" cy="50" r="5" fill="#9061F9" />

                <text
                  x="50%"
                  y="35"
                  textAnchor="middle"
                  className="text-xs font-semibold fill-purple-800"
                >
                  JOIN ON
                </text>
                <text
                  x="50%"
                  y="55"
                  textAnchor="middle"
                  className="text-xs fill-purple-800"
                >
                  customer_id = customer_id
                </text>
              </svg>

              {/* Orders table representation */}
              <div className="w-48 bg-white rounded-lg shadow-md border border-purple-300 p-3 absolute right-0 top-0 z-10">
                <div className="text-center font-semibold text-purple-800 mb-2 text-sm">
                  Orders
                </div>
                <div className="mb-1">
                  <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                    customer_id
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      1
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      1
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center text-xs bg-purple-100 rounded">
                      2
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                    amount
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      $50
                    </div>
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      $25
                    </div>
                    <div className="px-1 text-xs bg-purple-50 rounded whitespace-nowrap">
                      $75
                    </div>
                  </div>
                </div>
              </div>

              {/* Down arrows */}
              <div className="absolute left-24 top-32 transform -translate-x-1/2">
                <svg
                  className="w-6 h-6 text-purple-500"
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
              <div className="absolute right-24 top-32 transform translate-x-1/2">
                <svg
                  className="w-6 h-6 text-purple-500"
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
              <div className="w-full bg-white rounded-lg shadow-md border border-purple-300 p-3 absolute left-0 top-44">
                <div className="text-center font-semibold text-purple-800 mb-2">
                  Combined Result
                </div>
                <div className="flex justify-around">
                  <div className="text-center">
                    <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                      customer name
                    </div>
                    <div className="space-y-1">
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        John
                      </div>
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        John
                      </div>
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        Jane
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-1 rounded text-xs font-medium mb-1">
                      order amount
                    </div>
                    <div className="space-y-1">
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        $50
                      </div>
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        $25
                      </div>
                      <div className="px-2 text-xs bg-purple-50 rounded">
                        $75
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-44 space-y-4 text-purple-800">
              <p className="font-semibold text-lg">
                JOIN acts like a matchmaker for your tables
              </p>
              <p>
                The JOIN operation combines rows from two or more tables based
                on a related column. Think of it as a marriage ceremony where
                rows are paired based on matching values in the specified
                columns.
              </p>
              <p>In our example:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-purple-100 px-1 rounded">
                    Customers c JOIN Orders o
                  </code>{" "}
                  - Combines these two tables
                </li>
                <li>
                  <code className="bg-purple-100 px-1 rounded">
                    ON c.customer_id = o.customer_id
                  </code>{" "}
                  - The matching condition
                </li>
                <li>
                  Each customer might have multiple orders, so one customer can
                  appear multiple times in the results
                </li>
                <li>
                  If a customer has no orders (or vice versa with RIGHT JOIN),
                  they won&apos;t appear in an INNER JOIN result
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Types of JOINs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-3 rounded-md">
                <div className="font-medium text-purple-800 mb-1">
                  INNER JOIN
                </div>
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 w-10 h-10 bg-purple-200 rounded-full left-0"></div>
                    <div className="absolute inset-0 w-10 h-10 bg-purple-200 rounded-full right-0"></div>
                    <div className="absolute inset-0 w-6 h-10 bg-purple-500 rounded-full mx-auto"></div>
                  </div>
                </div>
                <p className="text-xs text-purple-800">
                  Returns rows when there is a match in both tables
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <div className="font-medium text-purple-800 mb-1">
                  LEFT JOIN
                </div>
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 w-10 h-10 bg-purple-500 rounded-full left-0"></div>
                    <div className="absolute inset-0 w-10 h-10 bg-purple-200 rounded-full right-0"></div>
                    <div className="absolute inset-0 w-6 h-10 bg-purple-500 rounded-full left-2"></div>
                  </div>
                </div>
                <p className="text-xs text-purple-800">
                  Returns all rows from the left table, plus matched rows from
                  the right table
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <div className="font-medium text-purple-800 mb-1">
                  RIGHT JOIN
                </div>
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 w-10 h-10 bg-purple-200 rounded-full left-0"></div>
                    <div className="absolute inset-0 w-10 h-10 bg-purple-500 rounded-full right-0"></div>
                    <div className="absolute inset-0 w-6 h-10 bg-purple-500 rounded-full right-2"></div>
                  </div>
                </div>
                <p className="text-xs text-purple-800">
                  Returns all rows from the right table, plus matched rows from
                  the left table
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <div className="font-medium text-purple-800 mb-1">
                  FULL JOIN
                </div>
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 w-10 h-10 bg-purple-500 rounded-full left-0"></div>
                    <div className="absolute inset-0 w-10 h-10 bg-purple-500 rounded-full right-0"></div>
                    <div className="absolute inset-0 w-16 h-10 bg-purple-500 rounded-full mx-auto"></div>
                  </div>
                </div>
                <p className="text-xs text-purple-800">
                  Returns rows when there is a match in either left or right
                  table
                </p>
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

          <div className="mt-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
            <h3 className="font-medium text-purple-800 mb-2">
              SQL Query Execution Order
            </h3>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                1
              </div>
              <div className="text-gray-600">FROM Customers</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 text-xs mr-2">
                2
              </div>
              <div className="font-semibold text-purple-800">
                JOIN Orders ON customer_id = customer_id
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                3
              </div>
              <div className="text-gray-600">
                SELECT first_name, last_name, order_date, total_amount
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                4
              </div>
              <div className="text-gray-600">LIMIT 6</div>
            </div>
            <p className="mt-4 text-xs text-purple-600 italic">
              JOINs are processed early in query execution, effectively creating
              a temporary combined table before other operations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinOperation;
