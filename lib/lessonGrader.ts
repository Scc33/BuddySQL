import { GradeOptions } from "./queryGrader";

export function getGradeOptionsForLesson(lessonId: string): GradeOptions {
  // Define grading options based on lesson ID and whether it's a challenge
  switch (lessonId) {
    case "1": // Introduction to SQL
      return {}; // No challenge for lesson 1

    case "2": // SELECT Basics
      return {
        mustContain: ["SELECT", "name", "price", "FROM", "Products"],
        expectedColumns: ["name", "price"],
        expectedRows: 10, // Number of products
        hints: [
          "Make sure to select only the name and price columns",
          "Check that you're selecting from the Products table",
        ],
      };

    case "3": // Filtering with WHERE
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "WHERE",
          "category",
          "Electronics",
        ],
        expectedRows: 3, // Number of electronics products
        hints: [
          "Check your WHERE clause",
          "Make sure to filter for the 'Electronics' category",
          "String values need to be enclosed in single quotes: 'Electronics'",
        ],
      };

    case "4": // Pattern Matching with LIKE
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Customers",
          "WHERE",
          "last_name",
          "LIKE",
          "S%",
        ],
        expectedRows: 1, // Number of customers with last name starting with S
        hints: [
          "Use the LIKE operator for pattern matching",
          "The % wildcard represents any number of characters",
          "To find names starting with 'S', use the pattern 'S%'",
          "Make sure to use single quotes around your pattern: 'S%'",
        ],
      };

    case "5": // NULL Values
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "WHERE",
          "description",
          "IS NOT NULL",
          "AND",
          "price",
          ">",
          "50",
        ],
        hints: [
          "Use IS NOT NULL to find products with a description",
          "Combine with AND and a condition on price",
          "Remember that you can't use = NULL or != NULL; you must use IS NULL or IS NOT NULL",
        ],
      };

    case "6": // Sorting Results
      return {
        mustContain: ["SELECT", "FROM", "Customers", "ORDER BY", "last_name"],
        hints: [
          "Use ORDER BY to sort the results",
          "Sort by the last_name column",
          "ASC (ascending) is the default sort order, so you don't need to specify it",
        ],
      };

    case "7": // Aggregate Functions
      return {
        mustContain: ["SELECT", "SUM", "total_amount", "FROM", "Orders"],
        hints: [
          "Use the SUM aggregate function",
          "Apply it to the total_amount column in the Orders table",
        ],
      };

    case "8": // Grouping Data
      return {
        mustContain: [
          "SELECT",
          "customer_id",
          "SUM",
          "total_amount",
          "FROM",
          "Orders",
          "GROUP BY",
          "customer_id",
        ],
        hints: [
          "Use GROUP BY to group orders by customer_id",
          "Use SUM to calculate the total amount spent by each customer",
        ],
      };

    case "9": // Basic JOINs
      return {
        mustContain: [
          "SELECT",
          "order_id",
          "quantity",
          "name",
          "price",
          "FROM",
          "Order_Items",
          "INNER JOIN",
          "Products",
          "ON",
          "product_id",
        ],
        hints: [
          "Join the Order_Items and Products tables",
          "Use INNER JOIN to connect the tables",
          "Join on the product_id column that appears in both tables",
          "Make sure to select columns from both tables",
        ],
      };

    // Add these cases to your getGradeOptionsForLesson function in lib/lessonGrader.ts

    case "10": // LIMIT Clause
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "ORDER BY",
          "price",
          "ASC",
          "LIMIT",
          "5",
        ],
        expectedRows: 5,
        hints: [
          "Use ORDER BY price ASC to sort by price in ascending order",
          "Use LIMIT 5 to get exactly 5 results",
          "Make sure your query selects from the Products table",
        ],
      };

    case "11": // OFFSET Clause
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "ORDER BY",
          "price",
          "ASC",
          "LIMIT",
          "3",
          "OFFSET",
          "2",
        ],
        expectedRows: 3,
        hints: [
          "Use ORDER BY price ASC to sort by price in ascending order",
          "Use LIMIT 3 to get exactly 3 results",
          "Use OFFSET 2 to skip the first two cheapest products",
          "Make sure your query selects from the Products table",
        ],
      };

    case "12": // LEFT JOIN
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "LEFT JOIN",
          "Order_Items",
          "ON",
          "product_id",
          "ORDER BY",
        ],
        hints: [
          "Use LEFT JOIN to ensure ALL products are included",
          "Join the Products and Order_Items tables on the product_id column",
          "Remember to ORDER BY product_id for consistent results",
          "Products with no orders will have NULL values for order_id and quantity",
        ],
      };

    case "13": // RIGHT JOIN
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "RIGHT JOIN",
          "Customers",
          "ON",
          "customer_id",
          "ORDER BY",
        ],
        hints: [
          "Use RIGHT JOIN with Orders on the left and Customers on the right",
          "Join the tables on the customer_id column",
          "Make sure to ORDER BY customer_id for consistent results",
          "Customers with no orders will have NULL values for order_id and order_date",
          "Alternatively, you could use LEFT JOIN by switching the table order",
        ],
      };

    case "14": // FULL JOIN (using UNION)
      return {
        mustContain: [
          "SELECT",
          "FROM",
          "Products",
          "LEFT JOIN",
          "Order_Items",
          "UNION",
          "WHERE",
          "IS NULL",
        ],
        hints: [
          "Use UNION to combine two queries that simulate a FULL JOIN",
          "First query: Products LEFT JOIN Order_Items WHERE order_id IS NULL",
          "Second query: Order_Items LEFT JOIN Products WHERE product_id IS NULL",
          "Make sure both queries have the same columns in the same order",
          "Remember that SQLite doesn't support FULL JOIN directly",
        ],
      };

    default:
      return {}; // Default empty options
  }
}
