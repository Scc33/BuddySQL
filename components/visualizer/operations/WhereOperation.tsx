import React from "react";
import { SqlResult } from "@/types/database";
import { ResultTable } from "@/components/lessons/ResultTable";

interface WhereOperationProps {
  results: SqlResult | null;
}

const WhereOperation: React.FC<WhereOperationProps> = ({ results }) => {
  if (!results) {
    return <div>No results available</div>;
  }

  // Example query that's being visualized
  const exampleQuery =
    "SELECT name, price, category FROM Products WHERE price > 70 ORDER BY price DESC;";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-800 mb-2">
          WHERE Operation
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm font-mono">{exampleQuery}</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual explanation */}
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-3">
              How WHERE Works
            </h3>
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                {/* Full dataset representation */}
                <div className="relative w-full max-w-md mx-auto mb-3">
                  <div className="relative bg-white rounded-lg shadow-md border border-yellow-300 p-4">
                    <div className="text-center font-semibold text-yellow-800 mb-2">
                      All Products
                    </div>
                    <div className="space-y-2">
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Smartphone X</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $799.99
                        </div>
                        <div className="w-2/5 text-xs italic">Electronics</div>
                      </div>
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Laptop Pro</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $1299.99
                        </div>
                        <div className="w-2/5 text-xs italic">Electronics</div>
                      </div>
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Wireless Headphones</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $159.99
                        </div>
                        <div className="w-2/5 text-xs italic">Electronics</div>
                      </div>
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Coffee Maker</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $89.99
                        </div>
                        <div className="w-2/5 text-xs italic">
                          Home Appliances
                        </div>
                      </div>
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Running Shoes</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $79.99
                        </div>
                        <div className="w-2/5 text-xs italic">Sportswear</div>
                      </div>
                      <div className="flex bg-white p-1 border border-gray-100 rounded">
                        <div className="w-2/5 text-xs">Blender</div>
                        <div className="w-1/5 text-xs font-semibold">
                          $69.99
                        </div>
                        <div className="w-2/5 text-xs italic">
                          Home Appliances
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter representation */}
                <div className="flex justify-center items-center my-4 relative">
                  <div className="w-44 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <div className="text-yellow-800 font-bold">
                      price &gt; 70
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    <svg
                      className="w-8 h-8 text-yellow-500"
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
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <svg
                      className="w-8 h-8 text-yellow-500"
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
                </div>

                {/* Filtered result set */}
                <div className="relative bg-white rounded-lg shadow-md border border-yellow-300 p-4">
                  <div className="text-center font-semibold text-yellow-800 mb-2">
                    Filtered Products
                  </div>
                  <div className="space-y-2">
                    <div className="flex bg-white p-1 border border-yellow-100 rounded bg-yellow-50">
                      <div className="w-2/5 text-xs">Smartphone X</div>
                      <div className="w-1/5 text-xs font-semibold">$799.99</div>
                      <div className="w-2/5 text-xs italic">Electronics</div>
                    </div>
                    <div className="flex bg-white p-1 border border-yellow-100 rounded bg-yellow-50">
                      <div className="w-2/5 text-xs">Laptop Pro</div>
                      <div className="w-1/5 text-xs font-semibold">
                        $1299.99
                      </div>
                      <div className="w-2/5 text-xs italic">Electronics</div>
                    </div>
                    <div className="flex bg-white p-1 border border-yellow-100 rounded bg-yellow-50">
                      <div className="w-2/5 text-xs">Wireless Headphones</div>
                      <div className="w-1/5 text-xs font-semibold">$159.99</div>
                      <div className="w-2/5 text-xs italic">Electronics</div>
                    </div>
                    <div className="flex bg-white p-1 border border-yellow-100 rounded bg-yellow-50">
                      <div className="w-2/5 text-xs">Coffee Maker</div>
                      <div className="w-1/5 text-xs font-semibold">$89.99</div>
                      <div className="w-2/5 text-xs italic">
                        Home Appliances
                      </div>
                    </div>
                    <div className="flex bg-white p-1 border border-yellow-100 rounded bg-yellow-50">
                      <div className="w-2/5 text-xs">Running Shoes</div>
                      <div className="w-1/5 text-xs font-semibold">$79.99</div>
                      <div className="w-2/5 text-xs italic">Sportswear</div>
                    </div>
                    {/* This one is filtered out */}
                    <div className="flex bg-white p-1 border border-gray-100 rounded opacity-20">
                      <div className="w-2/5 text-xs">Blender</div>
                      <div className="w-1/5 text-xs font-semibold">$69.99</div>
                      <div className="w-2/5 text-xs italic">
                        Home Appliances
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-yellow-800">
              <p className="font-semibold text-lg">
                WHERE acts like a sieve for your data
              </p>
              <p>
                The WHERE clause filters rows, allowing only those that match
                specific conditions to pass through to your results. Think of it
                as a bouncer that checks each row's credentials before allowing
                it into your result set.
              </p>
              <p>In our example:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="bg-yellow-100 px-1 rounded">
                    price &gt; 70
                  </code>{" "}
                  - Only includes products that cost more than $70
                </li>
                <li>
                  The Blender at $69.99 is excluded because it doesn't meet the
                  condition
                </li>
                <li>
                  All other products pass through the filter because their
                  prices exceed $70
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              Common WHERE Operators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-yellow-50 p-3 rounded-md">
                <div className="font-medium text-yellow-800">Comparison</div>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>=</code> Equal to
                  </li>
                  <li>
                    <code>&gt;</code> Greater than
                  </li>
                  <li>
                    <code>&lt;</code> Less than
                  </li>
                  <li>
                    <code>&gt;=</code> Greater than or equal
                  </li>
                  <li>
                    <code>&lt;=</code> Less than or equal
                  </li>
                  <li>
                    <code>&lt;&gt;</code> or <code>!=</code> Not equal
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <div className="font-medium text-yellow-800">Logical</div>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>AND</code> Both conditions must be true
                  </li>
                  <li>
                    <code>OR</code> Either condition can be true
                  </li>
                  <li>
                    <code>NOT</code> Negates a condition
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <div className="font-medium text-yellow-800">
                  Pattern Matching
                </div>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>LIKE</code> Pattern matching with wildcards
                  </li>
                  <li>
                    <code>%</code> Any sequence of characters
                  </li>
                  <li>
                    <code>_</code> Any single character
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <div className="font-medium text-yellow-800">Other</div>
                <ul className="text-sm space-y-1">
                  <li>
                    <code>IN</code> Matches any in a list
                  </li>
                  <li>
                    <code>BETWEEN</code> Within a range
                  </li>
                  <li>
                    <code>IS NULL</code> Is a null value
                  </li>
                  <li>
                    <code>IS NOT NULL</code> Is not a null value
                  </li>
                </ul>
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

          <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">
              SQL Query Execution Order
            </h3>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                1
              </div>
              <div className="text-gray-600">FROM Products</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 text-xs mr-2">
                2
              </div>
              <div className="font-semibold text-yellow-800">
                WHERE price &gt; 70
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                3
              </div>
              <div className="text-gray-600">SELECT name, price, category</div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs mr-2">
                4
              </div>
              <div className="text-gray-600">ORDER BY price DESC</div>
            </div>
            <p className="mt-4 text-xs text-yellow-600 italic">
              The WHERE clause is applied early in query execution, before
              selecting columns!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereOperation;
