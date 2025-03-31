// lib/lessonGrader.ts
import { GradeOptions, validators } from "./queryGrader";

/**
 * Returns the appropriate grading options for a specific lesson
 */
export function getGradeOptionsForLesson(
  lessonId: string,
  isChallenge: boolean = false
): GradeOptions {
  // Default hints for different lesson types
  const defaultHints = {
    select: [
      "Make sure your SELECT syntax is correct",
      "Check that you're selecting the right columns",
      "Verify your table name",
    ],
    where: [
      "Ensure your WHERE clause has the correct conditions",
      "Check the comparison operators (=, <, >, etc.)",
      "Verify any string values are properly quoted",
    ],
    join: [
      "Verify your JOIN syntax",
      "Check that you're joining the tables on the correct keys",
      "Make sure the JOIN type (INNER, LEFT, etc.) is correct",
    ],
    groupBy: [
      "Ensure you're using the GROUP BY clause correctly",
      "Check that you're grouping by the right columns",
      "Remember that non-aggregated columns in the SELECT should be in the GROUP BY",
    ],
  };

  // Define grading options based on lesson ID and whether it's a challenge
  switch (lessonId) {
    case "1": // Introduction to SQL
      return isChallenge
        ? {} // No challenge for lesson 1
        : {
            mustContain: ["SELECT", "FROM", "Customers"],
            hints: defaultHints.select,
          };

    case "2": // SELECT Basics
      return isChallenge
        ? {
            mustContain: ["SELECT", "name", "price", "FROM", "Products"],
            expectedColumns: ["name", "price"],
            expectedRows: 10, // Number of products
            hints: [
              "Make sure to select only the name and price columns",
              "Check that you're selecting from the Products table",
            ],
          }
        : {
            mustContain: [
              "SELECT",
              "first_name",
              "last_name",
              "email",
              "FROM",
              "Customers",
            ],
            expectedColumns: ["first_name", "last_name", "email"],
            hints: defaultHints.select,
          };

    case "3": // Filtering with WHERE
      return isChallenge
        ? {
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
          }
        : {
            mustContain: [
              "SELECT",
              "FROM",
              "Products",
              "WHERE",
              "price",
              ">",
              "100",
            ],
            hints: defaultHints.where,
          };

    case "4": // Sorting Results
      return isChallenge
        ? {
            mustContain: [
              "SELECT",
              "FROM",
              "Customers",
              "ORDER BY",
              "last_name",
            ],
            hints: [
              "Use ORDER BY to sort the results",
              "Sort by the last_name column",
              "ASC (ascending) is the default sort order, so you don't need to specify it",
            ],
          }
        : {
            mustContain: [
              "SELECT",
              "FROM",
              "Products",
              "ORDER BY",
              "price",
              "DESC",
            ],
            hints: defaultHints.select.concat([
              "Use ORDER BY to sort by price",
              "Use DESC to sort in descending order (highest to lowest)",
            ]),
          };

    case "5": // Aggregate Functions
      return isChallenge
        ? {
            mustContain: ["SELECT", "SUM", "total_amount", "FROM", "Orders"],
            hints: [
              "Use the SUM aggregate function",
              "Apply it to the total_amount column in the Orders table",
            ],
          }
        : validators.aggregation(["COUNT"], false);

    case "6": // Grouping Data
      return isChallenge
        ? {
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
          }
        : validators.aggregation(["COUNT"], true);

    case "7": // Basic JOINs
      return isChallenge
        ? {
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
          }
        : validators.joining("INNER JOIN", ["Customers", "Orders"]);

    default:
      return {}; // Default empty options
  }
}
