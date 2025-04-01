import { GradeOptions } from "./queryGrader";

/**
 * Returns the appropriate grading options for a specific lesson
 */
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
    case "4": // Sorting Results
      return {
        mustContain: ["SELECT", "FROM", "Customers", "ORDER BY", "last_name"],
        hints: [
          "Use ORDER BY to sort the results",
          "Sort by the last_name column",
          "ASC (ascending) is the default sort order, so you don't need to specify it",
        ],
      };
    case "5": // Aggregate Functions
      return {
        mustContain: ["SELECT", "SUM", "total_amount", "FROM", "Orders"],
        hints: [
          "Use the SUM aggregate function",
          "Apply it to the total_amount column in the Orders table",
        ],
      };
    case "6": // Grouping Data
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
    case "7": // Basic JOINs
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

    default:
      return {}; // Default empty options
  }
}
