import React from "react";
import { SqlResult } from "@/types/database";
import { ResultTable } from "@/components/lessons/ResultTable";

interface GroupByOperationProps {
  results: SqlResult | null;
}

const GroupByOperation: React.FC<GroupByOperationProps> = ({ results }) => {
  if (!results) {
    return <div>No results available</div>;
  }

  // Example query that's being visualized
  const exampleQuery =
    "SELECT category, COUNT(*) as product_count, AVG(price) as avg_price FROM Products GROUP BY category;";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          GROUP BY Operation
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm font-mono">{exampleQuery}</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual explanation */}
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-4">
              How GROUP BY Works
            </h3>

            <div className="space-y-8 my-6">
              {/* Initial data */}
              <div className="relative">
                <div className="text-center font-semibold text-green-800 mb-3">
                  Original Product Data
                </div>
                <div className="bg-white rounded-lg shadow-md border border-green-300 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      Name
                    </div>
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      Price
                    </div>
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      Category
                    </div>
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Laptop Pro</div>
                      <div className="text-xs p-1">$1299.99</div>
                      <div className="text-xs p-1 bg-green-50">Electronics</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Smartphone X</div>
                      <div className="text-xs p-1">$799.99</div>
                      <div className="text-xs p-1 bg-green-50">Electronics</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Headphones</div>
                      <div className="text-xs p-1">$159.99</div>
                      <div className="text-xs p-1 bg-green-50">Electronics</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Coffee Maker</div>
                      <div className="text-xs p-1">$89.99</div>
                      <div className="text-xs p-1 bg-green-100">
                        Home Appliances
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Blender</div>
                      <div className="text-xs p-1">$69.99</div>
                      <div className="text-xs p-1 bg-green-100">
                        Home Appliances
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-xs p-1">Running Shoes</div>
                      <div className="text-xs p-1">$79.99</div>
                      <div className="text-xs p-1 bg-yellow-100">
                        Sportswear
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grouping process arrows */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-green-800 font-medium my-2">
                    GROUP BY category
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grouped data */}
              <div className="relative">
                <div className="text-center font-semibold text-green-800 mb-3">
                  Grouped Results with Aggregation
                </div>
                <div className="bg-white rounded-lg shadow-md border border-green-300 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      Category
                    </div>
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      COUNT(*)
                    </div>
                    <div className="bg-green-100 p-1 rounded text-center text-xs font-medium">
                      AVG(price)
                    </div>
                  </div>
                  <div className="space-y-3 mt-2">
                    <div className="grid grid-cols-3 gap-2 bg-green-50 p-2 rounded">
                      <div className="text-xs font-medium">Electronics</div>
                      <div className="text-xs">3 products</div>
                      <div className="text-xs">$753.32</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-green-50 p-2 rounded">
                      <div className="text-xs font-medium">Home Appliances</div>
                      <div className="text-xs">2 products</div>
                      <div className="text-xs">$79.99</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-green-50 p-2 rounded">
                      <div className="text-xs font-medium">Sportswear</div>
                      <div className="text-xs">1 product</div>
                      <div className="text-xs">$79.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-green-800">
              <p className="font-semibold text-lg">
                GROUP BY acts like a sorting hat for your data
              </p>
              <p>
                The GROUP BY clause organizes rows into groups based on matching
                values in specified columns. Think of it as sorting items into
                different buckets, then calculating summaries for each bucket.
              </p>
              <p>In our example:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-green-100 px-1 rounded">
                    GROUP BY category
                  </code>{" "}
                  - Organizes products into categories
                </li>
                <li>
                  <code className="bg-green-100 px-1 rounded">
                    COUNT(*) as product_count
                  </code>{" "}
                  - Counts the number of products in each category
                </li>
                <li>
                  <code className="bg-green-100 px-1 rounded">
                    AVG(price) as avg_price
                  </code>{" "}
                  - Calculates the average price for each category
                </li>
              </ul>
              <p>
                Without GROUP BY, aggregate functions like COUNT() would reduce
                all rows to a single summary value. GROUP BY lets you create
                summaries for specific segments of your data.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              Common Aggregate Functions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-md">
                <div className="font-medium text-green-800">COUNT()</div>
                <p className="text-sm text-green-700">
                  Counts the number of rows or non-NULL values
                </p>
                <div className="mt-1 text-xs bg-green-100 p-1 rounded">
                  <code>COUNT(*)</code> - Counts all rows
                  <br />
                  <code>COUNT(column)</code> - Counts non-NULL values
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <div className="font-medium text-green-800">SUM()</div>
                <p className="text-sm text-green-700">
                  Calculates the total of values in a column
                </p>
                <div className="mt-1 text-xs bg-green-100 p-1 rounded">
                  <code>SUM(price)</code> - Total price of all items
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <div className="font-medium text-green-800">AVG()</div>
                <p className="text-sm text-green-700">
                  Calculates the average of values
                </p>
                <div className="mt-1 text-xs bg-green-100 p-1 rounded">
                  <code>AVG(rating)</code> - Average rating
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <div className="font-medium text-green-800">MIN() / MAX()</div>
                <p className="text-sm text-green-700">
                  Finds the smallest/largest values
                </p>
                <div className="mt-1 text-xs bg-green-100 p-1 rounded">
                  <code>MIN(price)</code> - Cheapest product
                  <br />
                  <code>MAX(price)</code> - Most expensive product
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

          <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">
              SQL Query Execution Order
            </h3>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                1
              </div>
              <div className="text-gray-600">FROM Products</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                2
              </div>
              <div className="text-gray-600">(WHERE clause if present)</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-xs mr-2">
                3
              </div>
              <div className="font-semibold text-green-800">
                GROUP BY category
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                4
              </div>
              <div className="text-gray-600">(HAVING clause if present)</div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                5
              </div>
              <div className="text-gray-600">
                SELECT category, COUNT(*), AVG(price)
              </div>
            </div>
            <p className="mt-4 text-xs text-green-600 italic">
              GROUP BY happens before SELECT is applied but after filtering with
              WHERE!
            </p>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">
              Important GROUP BY Rules
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Every column in your SELECT list must either be in the GROUP BY
                clause or inside an aggregate function
              </li>
              <li className="flex">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Use HAVING (not WHERE) to filter groups based on aggregate
                values
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupByOperation;
