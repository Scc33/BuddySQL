import { Lesson } from "@/types/lesson";
import { sampleDatabaseInit } from "./database";

export const lessons: Lesson[] = [
  {
    id: "1",
    slug: "introduction-to-sql",
    title: "Introduction to SQL",
    description: "Learn what SQL is and why it's important",
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
    order: 4,
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
    id: "5",
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
    order: 5,
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
    id: "6",
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
    order: 6,
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
    id: "7",
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
    order: 7,
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
  { name: "advanced", label: "Advanced SQL" },
];

export function initializeDatabase() {
  return sampleDatabaseInit;
}
