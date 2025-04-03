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

  // OFFSET lesson
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
