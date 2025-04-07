import { Lesson } from "@/types/lesson";
import { sampleDatabaseInit } from "./database";

export const lessons: Lesson[] = [
  {
    id: "1",
    slug: "introduction-to-sql",
    title: "Introduction to SQL",
    description:
      "Learn what Structured Query Language is and why it's important",
    content: `
# What is SQL?

SQL (Structured Query Language) is a standard programming language specifically designed for managing and manipulating relational databases. It's pronounced as "sequel" or "S-Q-L" and has been around since the 1970s.

## Why SQL is Important

- **Universal Language**: SQL is used across virtually all database systems
- **Data Management**: Makes it possible to store, retrieve, update, and delete data efficiently
- **Analysis**: Allows you to extract insights by querying complex data
- **Powerful**: Simple syntax yet powerful capabilities for data operations
- **Career Skill**: Essential skill for data analysts, engineers, scientists, and many tech roles

## Try Your First SQL Command

The most basic SQL command is \`SELECT\`, which retrieves data from a database.

Try running the query in the editor to see all customers in our database:

\`\`\`sql
SELECT * FROM Customers;
\`\`\`

The asterisk (\`*\`) means "all columns" - so this query asks for all data from the Customers table.
    `,
    order: 1,
    category: "basics",
    initialQuery: "SELECT * FROM Customers;",
    challenge: {
      description: "Write a query to select from the customers table",
      success_message: "Great job! You're well on your way to learning SQL!",
      validation_query: "SELECT * FROM Customers;",
    },
  },
  {
    id: "2",
    slug: "select-basics",
    title: "SELECT Basics",
    description: "Learn how to retrieve specific columns of data",
    content: `
# Selecting Specific Columns

In the previous lesson, we used \`SELECT *\` to get all columns from a table. However, often you only need specific columns.

## Syntax for Selecting Columns

\`\`\`sql
SELECT column1, column2, ... FROM table_name;
\`\`\`

## Benefits of Selecting Specific Columns

- **Efficiency**: Only retrieves the data you need, saving bandwidth and memory
- **Clarity**: Makes results easier to read and analyze
- **Performance**: Can significantly improve query speed on large tables

## Try It Out

Run a query to get only the first name, last name, and email of all customers:

\`\`\`sql
SELECT first_name, last_name, email FROM Customers;
\`\`\`

Notice how the results only contain the columns you specified!
    `,
    order: 2,
    category: "basics",
    initialQuery: "SELECT first_name, last_name, email FROM Customers;",
    challenge: {
      description:
        "Write a query to select only the product name and price from the Products table.",
      success_message:
        "Great job! You've successfully selected specific columns from the Products table.",
      validation_query: "SELECT name, price FROM Products;",
    },
  },
  {
    id: "3",
    slug: "filtering-with-where",
    title: "Filtering with WHERE",
    description: "Learn how to filter data using the WHERE clause",
    content: `
# Filtering Data with WHERE

The WHERE clause allows you to filter records, only returning rows that match specific conditions.

## Basic Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
\`\`\`

## Comparison Operators

- Equal: \`=\`
- Not equal: \`<>\` or \`!=\`
- Greater than: \`>\`
- Less than: \`<\`
- Greater than or equal: \`>=\`
- Less than or equal: \`<=\`

## Examples

Let's find all products with a price greater than $100:

\`\`\`sql
SELECT name, price, category 
FROM Products 
WHERE price > 100;
\`\`\`

Try running this query in the editor!
    `,
    order: 3,
    category: "basics",
    initialQuery:
      "SELECT name, price, category FROM Products WHERE price > 100;",
    challenge: {
      description:
        'Write a query to find all products in the "Electronics" category.',
      success_message:
        "Excellent! You've successfully filtered data using the WHERE clause.",
      validation_query:
        "SELECT * FROM Products WHERE category = 'Electronics';",
    },
  },
  {
    id: "4",
    slug: "pattern-matching",
    title: "Pattern Matching with LIKE",
    description: "Learn how to search for text patterns in your data",
    content: `
# Pattern Matching with LIKE

The LIKE operator allows you to search for patterns within text data, which is perfect for partial matches or when you don't know the exact text you're looking for.

## Basic Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name
WHERE column LIKE pattern;
\`\`\`

## Wildcard Characters

The LIKE operator uses special wildcard characters:

- **%** (percent sign): Represents zero, one, or multiple characters
- **_** (underscore): Represents a single character

## Common Pattern Examples

- \`'apple%'\`: Matches any string that starts with "apple"
- \`'%apple'\`: Matches any string that ends with "apple"
- \`'%apple%'\`: Matches any string containing "apple" anywhere
- \`'_pple'\`: Matches exactly 5 characters where the last 4 are "pple"
- \`'a_p_e'\`: Matches 5-letter words with 'a' at position 1, 'p' at position 3, and 'e' at position 5

## Try It Out

Let's find all products with names containing the word "Phone":

\`\`\`sql
SELECT name, price, category 
FROM Products 
WHERE name LIKE '%Phone%';
\`\`\`

Try running this query to see the results!
    `,
    order: 4,
    category: "basics",
    initialQuery:
      "SELECT name, price, category FROM Products WHERE name LIKE '%Phone%';",
    challenge: {
      description:
        "Write a query to find all customers whose last name starts with the letter 'S'.",
      success_message:
        "Excellent! You've successfully used pattern matching to search for specific text patterns.",
      validation_query: "SELECT * FROM Customers WHERE last_name LIKE 'S%';",
    },
  },
  {
    id: "5",
    slug: "null-values",
    title: "Working with NULL Values",
    description: "Learn how to handle missing data in SQL databases",
    content: `
# Understanding NULL Values in SQL

In the world of databases, NULL represents the absence of a value—it's not zero, an empty string, or false; it's the database's way of saying "this information is unknown or doesn't exist."

## What Makes NULL Special?

NULLs behave differently from other values in several important ways:

- NULL is not equal to anything, not even to another NULL
- Comparing NULL with any value (including NULL) using standard operators always results in UNKNOWN
- UNKNOWN is neither TRUE nor FALSE—it's a third logical state

## How to Check for NULL Values

Since \`column = NULL\` doesn't work as expected, SQL provides special operators:

- \`IS NULL\` - checks if a value is NULL
- \`IS NOT NULL\` - checks if a value is not NULL

## Examples of NULL Handling

Let's see how to find products that don't have a description:

\`\`\`sql
SELECT name, price, description 
FROM Products 
WHERE description IS NULL;
\`\`\`

To find products that do have a description:

\`\`\`sql
SELECT name, price, description 
FROM Products 
WHERE description IS NOT NULL;
\`\`\`

## The COALESCE Function

The COALESCE function provides a powerful way to handle NULL values by returning the first non-NULL value from a list of expressions:

\`\`\`sql
SELECT name, 
       price, 
       COALESCE(description, 'No description available') AS description
FROM Products;
\`\`\`

This query replaces NULL descriptions with the text "No description available."

## Common NULL Pitfalls

- NULLs in arithmetic operations: Any arithmetic with NULL results in NULL
- NULLs in WHERE conditions: Rows where the condition evaluates to NULL (not TRUE or FALSE) are not included
- NULLs in GROUP BY: All NULL values are grouped together
- NULLs in JOIN conditions: Rows with NULL values in join columns won't match

Try running these queries to see how NULL values behave in our database!
  `,
    order: 5,
    category: "basics",
    initialQuery:
      "SELECT name, price, COALESCE(description, 'No description available') AS description FROM Products;",
    challenge: {
      description:
        "Write a query to find all products that have a description (are NOT NULL) and cost more than $50.",
      success_message:
        "Excellent! You've successfully combined NULL handling with other conditions to filter data properly.",
      validation_query:
        "SELECT * FROM Products WHERE description IS NOT NULL AND price > 50;",
    },
  },
  {
    id: "6",
    slug: "sorting-results",
    title: "Sorting Results",
    description: "Learn how to sort query results using ORDER BY",
    content: `
# Sorting Results with ORDER BY

The ORDER BY clause allows you to sort the result set by one or more columns.

## Basic Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;
\`\`\`

## Sort Direction

- \`ASC\` - Ascending order (default if not specified)
- \`DESC\` - Descending order

## Example

Let's retrieve all products, sorted by price from highest to lowest:

\`\`\`sql
SELECT name, price, category 
FROM Products 
ORDER BY price DESC;
\`\`\`

Try running this query to see the results!
    `,
    order: 6,
    category: "basics",
    initialQuery:
      "SELECT name, price, category FROM Products ORDER BY price DESC;",
    challenge: {
      description:
        "Write a query to show all customers ordered alphabetically by last name.",
      success_message:
        "Great job! You've successfully sorted data using ORDER BY.",
      validation_query: "SELECT * FROM Customers ORDER BY last_name;",
    },
  },
  {
    id: "7",
    slug: "aggregate-functions",
    title: "Aggregate Functions",
    description: "Learn how to use COUNT, SUM, AVG, MIN, and MAX functions",
    content: `
# Aggregate Functions in SQL

Aggregate functions perform calculations on groups of rows and return a single value.

## Common Aggregate Functions

- \`COUNT()\`: Returns the number of rows
- \`SUM()\`: Adds values together
- \`AVG()\`: Calculates the average of values
- \`MIN()\`: Returns the minimum value
- \`MAX()\`: Returns the maximum value

## Examples

Count the total number of products:

\`\`\`sql
SELECT COUNT(*) AS total_products FROM Products;
\`\`\`

Find the average product price:

\`\`\`sql
SELECT AVG(price) AS average_price FROM Products;
\`\`\`

Find the highest and lowest priced products:

\`\`\`sql
SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM Products;
\`\`\`

Try running each of these examples to see the results!
    `,
    order: 7,
    category: "intermediate",
    initialQuery: "SELECT COUNT(*) AS total_products FROM Products;",
    challenge: {
      description:
        "Write a query to calculate the total value of all orders (hint: use SUM on the total_amount field in the Orders table).",
      success_message:
        "Excellent! You've successfully used an aggregate function to calculate a total.",
      validation_query: "SELECT SUM(total_amount) FROM Orders;",
    },
  },
  {
    id: "8",
    slug: "group-by",
    title: "Grouping Data",
    description:
      "Learn how to group data and use aggregate functions on groups",
    content: `
# Grouping Data with GROUP BY

The GROUP BY clause groups rows that have the same values into summary rows, like "total sales for each country" or "count of customers in each city".

## Basic Syntax

\`\`\`sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1;
\`\`\`

## Example

Count the number of products in each category:

\`\`\`sql
SELECT category, COUNT(*) AS product_count
FROM Products
GROUP BY category;
\`\`\`

Calculate the average price by category:

\`\`\`sql
SELECT category, AVG(price) AS average_price
FROM Products
GROUP BY category;
\`\`\`

Try running these queries to see how GROUP BY works!
    `,
    order: 8,
    category: "intermediate",
    initialQuery:
      "SELECT category, COUNT(*) AS product_count FROM Products GROUP BY category;",
    challenge: {
      description:
        "Write a query to find the total value of orders placed by each customer (hint: group by customer_id and sum the total_amount).",
      success_message:
        "Well done! You've successfully used GROUP BY to summarize data.",
      validation_query:
        "SELECT customer_id, SUM(total_amount) AS total_spent FROM Orders GROUP BY customer_id;",
    },
  },
  {
    id: "9",
    slug: "joins-basics",
    title: "Basic JOINs",
    description: "Learn how to combine data from multiple tables",
    content: `
# JOINing Tables in SQL

Joins allow you to combine rows from multiple tables based on a related column between them.

## INNER JOIN Syntax

The INNER JOIN keyword selects records that have matching values in both tables.

\`\`\`sql
SELECT column(s)
FROM table1
INNER JOIN table2 ON table1.column = table2.column;
\`\`\`

## Example

Let's retrieve customer information along with their orders:

\`\`\`sql
SELECT c.first_name, c.last_name, o.order_id, o.order_date, o.total_amount
FROM Customers c
INNER JOIN Orders o ON c.customer_id = o.customer_id;
\`\`\`

In this query:
- \`c\` and \`o\` are table aliases (shortcuts) for Customers and Orders
- The ON clause specifies which columns to match

Try running this query to see the results!
    `,
    order: 9,
    category: "intermediate",
    initialQuery:
      "SELECT c.first_name, c.last_name, o.order_id, o.order_date, o.total_amount FROM Customers c INNER JOIN Orders o ON c.customer_id = o.customer_id;",
    challenge: {
      description:
        "Write a query that shows product details for each order item (combine Order_Items with Products using a JOIN).",
      success_message:
        "Excellent! You've successfully joined multiple tables to retrieve related data.",
      validation_query:
        "SELECT oi.order_id, oi.quantity, p.name, p.price FROM Order_Items oi INNER JOIN Products p ON oi.product_id = p.product_id;",
    },
  },
  {
    id: "10",
    slug: "limit-clause",
    title: "The LIMIT Clause",
    description: "Learn how to restrict the number of rows returned by a query",
    content: `
  # Controlling Result Size with LIMIT
  
  When working with large datasets, you often don't need to retrieve all rows at once. The LIMIT clause allows you to specify exactly how many rows should be returned.
  
  ## The LIMIT Clause
  
  The LIMIT clause restricts the number of rows returned by a query.
  
  ### Basic Syntax
  
  \`\`\`sql
  SELECT column1, column2, ...
  FROM table_name
  LIMIT number_of_rows;
  \`\`\`
  
  ### Examples
  
  Retrieve only the 3 most expensive products:
  
  \`\`\`sql
  SELECT name, price, category 
  FROM Products 
  ORDER BY price DESC 
  LIMIT 3;
  \`\`\`
  
  Show the 5 newest customers (based on join date):
  
  \`\`\`sql
  SELECT customer_id, first_name, last_name, join_date 
  FROM Customers 
  ORDER BY join_date DESC 
  LIMIT 5;
  \`\`\`
  
  ## Practical Applications
  
  - **Top N Analysis**: Finding the top or bottom N items (highest sales, lowest inventory, etc.)
  - **Previews**: Showing just a few rows when exploring a new table
  - **Performance**: Limiting the amount of data returned to improve query performance
  - **Data Sampling**: Getting a small sample of data for quick analysis
  
  ## Important Notes
  
  - LIMIT is typically applied after other clauses like WHERE, GROUP BY, and ORDER BY
  - Without an ORDER BY clause, the specific rows returned can be unpredictable
  - Different database systems might use different syntax (e.g., FETCH FIRST in some SQL dialects)
  
  Try running the example queries to see how LIMIT works!
    `,
    order: 10,
    category: "basics",
    initialQuery:
      "SELECT name, price, category FROM Products ORDER BY price DESC LIMIT 3;",
    challenge: {
      description:
        "Write a query to find the 5 cheapest products ordered by price.",
      success_message:
        "Excellent! You've successfully used LIMIT to retrieve a specific number of rows.",
      validation_query: "SELECT * FROM Products ORDER BY price ASC LIMIT 5;",
    },
  },
  {
    id: "11",
    slug: "offset-clause",
    title: "The OFFSET Clause",
    description: "Learn how to skip rows in your query results",
    content: `
  # Skipping Rows with OFFSET
  
  Building on our knowledge of LIMIT, SQL provides another powerful clause - OFFSET. This allows you to skip a specific number of rows before starting to return results.
  
  ## The OFFSET Clause
  
  The OFFSET clause skips a specified number of rows before starting to return rows.
  
  ### Basic Syntax
  
  \`\`\`sql
  SELECT column1, column2, ...
  FROM table_name
  LIMIT number_of_rows OFFSET skip_rows;
  \`\`\`
  
  ### Examples
  
  Retrieve the 4th to 6th most expensive products:
  
  \`\`\`sql
  SELECT name, price, category 
  FROM Products 
  ORDER BY price DESC 
  LIMIT 3 OFFSET 3;
  \`\`\`
  
  Skip the 2 most recent customers and show the next 3:
  
  \`\`\`sql
  SELECT customer_id, first_name, last_name, join_date 
  FROM Customers 
  ORDER BY join_date DESC 
  LIMIT 3 OFFSET 2;
  \`\`\`
  
  ## Practical Applications
  
  - **Pagination**: Implementing "page 2", "page 3", etc. in an application
    - For page 1: LIMIT 10 OFFSET 0
    - For page 2: LIMIT 10 OFFSET 10
    - For page 3: LIMIT 10 OFFSET 20
    - The formula is: OFFSET = (page_number - 1) * page_size
  - **Data Analysis**: Skipping outliers or initial data points
  - **Batch Processing**: Processing data in batches
  
  ## Important Notes
  
  - Always combine OFFSET with ORDER BY to ensure predictable results
  - The first row in the result set has an offset of 0, not 1
  - Using large OFFSET values on big tables can be inefficient
  - Different database systems might have different maximums for OFFSET values
  
  Try running the example queries to see how OFFSET works with LIMIT!
    `,
    order: 11,
    category: "basics",
    initialQuery:
      "SELECT name, price, category FROM Products ORDER BY price DESC LIMIT 3 OFFSET 3;",
    challenge: {
      description:
        "Write a query to get the third, fourth, and fifth cheapest products ordered by price (hint: use LIMIT with OFFSET).",
      success_message:
        "Great job! You've successfully used OFFSET to skip rows in your query results.",
      validation_query:
        "SELECT * FROM Products ORDER BY price ASC LIMIT 3 OFFSET 2;",
    },
  },
  {
    id: "12",
    slug: "left-join",
    title: "LEFT JOIN",
    description:
      "Learn how to retrieve all records from the left table and matching records from the right table",
    content: `
# Understanding LEFT JOIN

A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table (the first table in the JOIN clause), and the matching records from the right table. If there is no match in the right table, NULL values are returned for right table columns.

## LEFT JOIN Syntax

\`\`\`sql
SELECT column(s)
FROM table1
LEFT JOIN table2 ON table1.column = table2.column;
\`\`\`

## LEFT JOIN Visualization

\`\`\`
┌────────────┐     ┌────────────┐
│  Table1    │     │  Table2    │
│  (LEFT)    │     │  (RIGHT)   │
└────────────┘     └────────────┘
    ┌───────────────┐
    │ Matched rows  │
    └───────────────┘
┌───────────┐
│ Unmatched │
│ rows from │
│ Table1    │
└───────────┘
\`\`\`

## When to Use LEFT JOIN

- When you need all records from the left table, regardless of matches in the right table
- To find records in the left table that don't have a match in the right table
- To identify "orphaned" records in a database

## Example

Let's get all customers and their orders. We want ALL customers, even those who haven't placed any orders:

\`\`\`sql
SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id;
\`\`\`

In the result, customers who haven't placed any orders will have NULL values for order_id and order_date.

## Finding Records with No Match

You can use a LEFT JOIN with a WHERE clause to find records that don't have a match:

\`\`\`sql
SELECT c.customer_id, c.first_name, c.last_name
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
\`\`\`

This query finds customers who haven't placed any orders.

Try running these examples to see LEFT JOIN in action!
  `,
    order: 12,
    category: "intermediate",
    initialQuery:
      "SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id;",
    challenge: {
      description:
        "Write a query that shows all products and their order details, including products that have never been ordered. Sort the results by product_id.",
      success_message:
        "Excellent! You've successfully used LEFT JOIN to include all products, even those without orders.",
      validation_query:
        "SELECT p.product_id, p.name, oi.order_id, oi.quantity FROM Products p LEFT JOIN Order_Items oi ON p.product_id = oi.product_id ORDER BY p.product_id;",
    },
  },
  {
    id: "13",
    slug: "right-join",
    title: "RIGHT JOIN",
    description:
      "Learn how to retrieve all records from the right table and matching records from the left table",
    content: `
# Understanding RIGHT JOIN

A RIGHT JOIN (or RIGHT OUTER JOIN) returns all records from the right table (the second table in the JOIN clause), and the matching records from the left table. If there is no match in the left table, NULL values are returned for left table columns.

## RIGHT JOIN Syntax

\`\`\`sql
SELECT column(s)
FROM table1
RIGHT JOIN table2 ON table1.column = table2.column;
\`\`\`

## RIGHT JOIN Visualization

\`\`\`
┌────────────┐     ┌────────────┐
│  Table1    │     │  Table2    │
│  (LEFT)    │     │  (RIGHT)   │
└────────────┘     └────────────┘
    ┌───────────────┐
    │ Matched rows  │
    └───────────────┘
                    ┌───────────┐
                    │ Unmatched │
                    │ rows from │
                    │ Table2    │
                    └───────────┘
\`\`\`

## When to Use RIGHT JOIN

- When you need all records from the right table, regardless of matches in the left table
- To find records in the right table that don't have a match in the left table
- In practice, RIGHT JOIN is less common as the same result can often be achieved by swapping the tables and using a LEFT JOIN

## Example

Let's get all products and the order items they appear in. We want ALL products, even those that haven't been ordered:

\`\`\`sql
SELECT p.product_id, p.name, oi.order_id, oi.quantity
FROM Order_Items oi
RIGHT JOIN Products p ON oi.product_id = p.product_id
ORDER BY p.product_id;
\`\`\`

This is equivalent to the LEFT JOIN example from the previous lesson, but with the tables switched.

## Finding Records with No Match

You can use a RIGHT JOIN with a WHERE clause to find records that don't have a match:

\`\`\`sql
SELECT p.product_id, p.name
FROM Order_Items oi
RIGHT JOIN Products p ON oi.product_id = p.product_id
WHERE oi.item_id IS NULL;
\`\`\`

This query finds products that haven't been ordered.

Try running these examples to see RIGHT JOIN in action!
  `,
    order: 13,
    category: "intermediate",
    initialQuery:
      "SELECT p.product_id, p.name, oi.order_id, oi.quantity FROM Order_Items oi RIGHT JOIN Products p ON oi.product_id = p.product_id ORDER BY p.product_id;",
    challenge: {
      description:
        "Write a query using RIGHT JOIN that shows all customers and their order details, including customers without orders. (Note: You could also solve this with LEFT JOIN by switching the table order.)",
      success_message:
        "Well done! You've successfully used RIGHT JOIN to include all customers, even those without orders.",
      validation_query:
        "SELECT o.order_id, o.order_date, c.customer_id, c.first_name, c.last_name FROM Orders o RIGHT JOIN Customers c ON o.customer_id = c.customer_id ORDER BY c.customer_id;",
    },
  },
  {
    id: "14",
    slug: "full-join",
    title: "FULL JOIN",
    description:
      "Learn how to retrieve all records when there's a match in either table",
    content: `
# Understanding FULL JOIN

A FULL JOIN (or FULL OUTER JOIN) returns all records when there is a match in either the left or right table. If there is no match, NULL values are returned for the columns from the table without a match.

> Note: SQLite does not directly support FULL JOIN, but the concept is important in SQL generally. We'll learn a workaround for SQLite.

## FULL JOIN Syntax (in standard SQL)

\`\`\`sql
SELECT column(s)
FROM table1
FULL JOIN table2 ON table1.column = table2.column;
\`\`\`

## FULL JOIN Visualization

\`\`\`
┌────────────┐     ┌────────────┐
│  Table1    │     │  Table2    │
│  (LEFT)    │     │  (RIGHT)   │
└────────────┘     └────────────┘
    ┌───────────────┐
    │ Matched rows  │
    └───────────────┘
┌───────────┐     ┌───────────┐
│ Unmatched │     │ Unmatched │
│ rows from │     │ rows from │
│ Table1    │     │ Table2    │
└───────────┘     └───────────┘
\`\`\`

## When to Use FULL JOIN

- When you need all records from both tables, regardless of whether there are matches
- To identify records in either table that don't have a match in the other
- For data integrity checks or finding "orphaned" records in either direction

## SQLite FULL JOIN Workaround Using UNION

Since SQLite doesn't support FULL JOIN directly, we can simulate it using UNION with LEFT JOIN and RIGHT JOIN:

\`\`\`sql
-- Get all matches and left-only records
SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id

UNION

-- Get right-only records (those not already included in the LEFT JOIN)
SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date
FROM Customers c
RIGHT JOIN Orders o ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;
\`\`\`

> Note: Since our sample database has referential integrity (all orders have valid customer IDs), this example won't actually show any additional records in the UNION portion.

## Finding Unmatched Records in Either Table

You can use a FULL JOIN with a WHERE clause to find records that don't have a match in either table:

\`\`\`sql
SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date
FROM Customers c
FULL JOIN Orders o ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL OR o.order_id IS NULL;
\`\`\`

This would find both customers without orders and orders without valid customers (though the latter shouldn't exist in our database).

## SQLite Alternative Using UNION

In SQLite, we'd simulate this with:

\`\`\`sql
-- Customers without orders
SELECT c.customer_id, c.first_name, c.last_name, NULL as order_id, NULL as order_date
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL

UNION

-- Orders without customers (shouldn't exist in our database)
SELECT NULL as customer_id, NULL as first_name, NULL as last_name, o.order_id, o.order_date
FROM Orders o
LEFT JOIN Customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
\`\`\`

Try running these examples to understand how a FULL JOIN works conceptually!
  `,
    order: 14,
    category: "intermediate",
    initialQuery:
      "SELECT c.customer_id, c.first_name, c.last_name, o.order_id, o.order_date FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;",
    challenge: {
      description:
        "Use the UNION technique to write a query that mimics a FULL JOIN between Products and Order_Items tables. Show product_id, name, and order_id, finding both products that haven't been ordered and any order items without a valid product (though the latter shouldn't exist in our database).",
      success_message:
        "Excellent! You've successfully simulated a FULL JOIN using UNION in SQLite.",
      validation_query:
        "SELECT p.product_id, p.name, oi.order_id FROM Products p LEFT JOIN Order_Items oi ON p.product_id = oi.product_id WHERE oi.item_id IS NULL UNION SELECT oi.product_id, p.name, oi.order_id FROM Order_Items oi LEFT JOIN Products p ON oi.product_id = p.product_id WHERE p.product_id IS NULL;",
    },
  },
  {
    id: "15",
    slug: "subqueries",
    title: "Subqueries",
    description:
      "Learn how to use queries inside other queries for powerful data retrieval",
    content: `
  # Understanding Subqueries in SQL
  
  A subquery is a query nested inside another query. Think of it as a query within a query - allowing you to use the result of one query as part of another query.
  
  ## When to Use Subqueries
  
  Subqueries are helpful when you need to:
  - Filter data based on results from another query
  - Compare values against aggregated results
  - Check for the existence of related records
  - Create more complex logic than a simple JOIN allows
  
  ## Basic Syntax
  
  Subqueries can appear in different parts of a SQL statement:
  
  \`\`\`sql
  -- In the WHERE clause
  SELECT column1, column2
  FROM table1
  WHERE column1 IN (SELECT column1 FROM table2 WHERE condition);
  
  -- In the FROM clause
  SELECT a.column1, b.column2
  FROM table1 a, (SELECT * FROM table2 WHERE condition) b
  WHERE a.id = b.id;
  
  -- In the SELECT clause
  SELECT 
      column1,
      (SELECT MAX(column2) FROM table2) as max_value
  FROM table1;
  \`\`\`
  
  ## Subquery Types
  
  1. **Scalar Subqueries**: Return a single value
  2. **Row Subqueries**: Return a single row with multiple columns
  3. **Column Subqueries**: Return a single column with multiple rows
  4. **Table Subqueries**: Return multiple columns and rows
  
  ## Example 1: Subquery in the WHERE Clause
  
  Let's find customers who have placed at least one order over $100:
  
  \`\`\`sql
  SELECT customer_id, first_name, last_name 
  FROM Customers
  WHERE customer_id IN (
      SELECT customer_id 
      FROM Orders 
      WHERE total_amount > 100
  );
  \`\`\`
  
  This query first finds all customer IDs from the Orders table where the total amount exceeds $100, then retrieves the customer details for those IDs.
  
  ## Example 2: Subquery in the SELECT Clause
  
  Find each product along with how much its price differs from the average product price:
  
  \`\`\`sql
  SELECT 
      name,
      price,
      price - (SELECT AVG(price) FROM Products) AS price_difference
  FROM 
      Products;
  \`\`\`
  
  Here, the subquery calculates the average price once, and then each row's price is compared against that average.
  
  ## Example 3: Subquery in the FROM Clause
  
  Find the average order amount for electronics products:
  
  \`\`\`sql
  SELECT AVG(order_total) AS avg_electronics_order
  FROM (
      SELECT o.order_id, SUM(oi.price_each * oi.quantity) AS order_total
      FROM Orders o
      JOIN Order_Items oi ON o.order_id = oi.order_id
      JOIN Products p ON oi.product_id = p.product_id
      WHERE p.category = 'Electronics'
      GROUP BY o.order_id
  ) AS electronics_orders;
  \`\`\`
  
  This complex query first creates a derived table of orders containing electronics products, then calculates the average order total from that derived table.
  
  ## Subquery Operators
  
  - **IN**: Checks if a value matches any value in the subquery result
  - **NOT IN**: Checks if a value doesn't match any value in the subquery result
  - **EXISTS**: Returns true if the subquery returns any rows
  - **NOT EXISTS**: Returns true if the subquery returns no rows
  - **ANY/SOME**: Returns true if any of the subquery values meet the condition
  - **ALL**: Returns true if all of the subquery values meet the condition
  
  Try running some of these examples to see how subqueries work!
    `,
    order: 15,
    category: "intermediate",
    initialQuery:
      "SELECT customer_id, first_name, last_name FROM Customers WHERE customer_id IN (SELECT customer_id FROM Orders WHERE total_amount > 100);",
    challenge: {
      description:
        "Write a query that finds all products that cost more than the average product price. (Hint: use a subquery to calculate the average price)",
      success_message:
        "Excellent! You've successfully used a subquery to compare individual products against an aggregate value.",
      validation_query:
        "SELECT * FROM Products WHERE price > (SELECT AVG(price) FROM Products);",
    },
  },
];

// Helper functions for lessons
export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );
  if (currentIndex <= 0) {
    return undefined;
  }
  return lessons[currentIndex - 1];
}

export const lessonCategories = [
  { name: "basics", label: "SQL Basics" },
  { name: "intermediate", label: "Intermediate SQL" },
];

export function initializeDatabase() {
  return sampleDatabaseInit;
}
