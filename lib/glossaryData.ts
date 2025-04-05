// lib/glossaryData.ts
import { GlossaryTerm } from "@/types/glossary";

export const glossaryTerms: GlossaryTerm[] = [
  // COMMANDS
  {
    id: "select",
    title: "SELECT",
    category: "command",
    description: "Retrieves data from one or more tables in a database.",
    syntax: "SELECT column1, column2, ... FROM table_name WHERE condition;",
    examples: [
      "SELECT * FROM Customers;",
      "SELECT first_name, last_name FROM Customers;",
      "SELECT name, price FROM Products WHERE price > 100;",
    ],
    relatedTerms: ["from", "where", "order-by"],
    slug: "select",
  },
  {
    id: "insert",
    title: "INSERT",
    category: "command",
    description: "Adds one or more new rows of data into a database table.",
    syntax:
      "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);",
    examples: [
      "INSERT INTO Customers (first_name, last_name, email) VALUES ('John', 'Doe', 'john@example.com');",
      "INSERT INTO Products (name, price, category) VALUES ('New Product', 24.99, 'Electronics');",
    ],
    relatedTerms: ["values", "create-table"],
    slug: "insert",
  },
  {
    id: "update",
    title: "UPDATE",
    category: "command",
    description: "Modifies existing data in a database table.",
    syntax:
      "UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;",
    examples: [
      "UPDATE Customers SET email = 'new.email@example.com' WHERE customer_id = 1;",
      "UPDATE Products SET price = price * 1.1 WHERE category = 'Electronics';",
    ],
    relatedTerms: ["set", "where"],
    slug: "update",
  },
  {
    id: "delete",
    title: "DELETE",
    category: "command",
    description: "Removes existing rows from a database table.",
    syntax: "DELETE FROM table_name WHERE condition;",
    examples: [
      "DELETE FROM Customers WHERE customer_id = 5;",
      "DELETE FROM Orders WHERE order_date < '2022-01-01';",
    ],
    relatedTerms: ["where", "truncate"],
    slug: "delete",
  },
  {
    id: "create-table",
    title: "CREATE TABLE",
    category: "command",
    description:
      "Creates a new table in the database with specified columns and constraints.",
    syntax:
      "CREATE TABLE table_name (column1 datatype constraints, column2 datatype constraints, ...);",
    examples: [
      "CREATE TABLE Employees (employee_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, hire_date DATE);",
      "CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL, category TEXT);",
    ],
    relatedTerms: [
      "alter-table",
      "drop-table",
      "data-types",
      "primary-key",
      "foreign-key",
    ],
    slug: "create-table",
  },
  {
    id: "alter-table",
    title: "ALTER TABLE",
    category: "command",
    description:
      "Modifies an existing database table structure by adding, modifying, or dropping columns and constraints.",
    syntax: "ALTER TABLE table_name action;",
    examples: [
      "ALTER TABLE Customers ADD COLUMN phone TEXT;",
      "ALTER TABLE Products DROP COLUMN old_price;",
      "ALTER TABLE Orders RENAME TO Invoices;",
    ],
    relatedTerms: ["create-table", "drop-table"],
    slug: "alter-table",
  },
  {
    id: "drop-table",
    title: "DROP TABLE",
    category: "command",
    description:
      "Permanently removes a table from the database, including all its data and structure.",
    syntax: "DROP TABLE table_name;",
    examples: [
      "DROP TABLE OldCustomers;",
      "DROP TABLE IF EXISTS TemporaryTable;",
    ],
    relatedTerms: ["create-table", "alter-table", "truncate"],
    slug: "drop-table",
  },
  {
    id: "truncate",
    title: "TRUNCATE",
    category: "command",
    description:
      "Quickly removes all rows from a table while maintaining the table structure. It's faster than DELETE for removing all rows.",
    syntax: "TRUNCATE TABLE table_name;",
    examples: ["TRUNCATE TABLE LogEntries;", "TRUNCATE TABLE TempData;"],
    relatedTerms: ["delete", "drop-table"],
    slug: "truncate",
  },
  {
    id: "create-index",
    title: "CREATE INDEX",
    category: "command",
    description:
      "Creates an index on a table column to speed up data retrieval operations at the cost of additional writes and storage space.",
    syntax: "CREATE INDEX index_name ON table_name (column1, column2, ...);",
    examples: [
      "CREATE INDEX idx_customer_email ON Customers (email);",
      "CREATE UNIQUE INDEX idx_product_sku ON Products (sku);",
    ],
    relatedTerms: ["drop-index", "indexes"],
    slug: "create-index",
  },
  {
    id: "create-view",
    title: "CREATE VIEW",
    category: "command",
    description:
      "Creates a virtual table based on the result set of a SELECT query. Views can simplify complex queries and provide an additional security layer.",
    syntax:
      "CREATE VIEW view_name AS SELECT column1, column2 FROM table_name WHERE condition;",
    examples: [
      "CREATE VIEW ActiveCustomers AS SELECT * FROM Customers WHERE status = 'active';",
      "CREATE VIEW ProductSummary AS SELECT category, COUNT(*) as count, AVG(price) as avg_price FROM Products GROUP BY category;",
    ],
    relatedTerms: ["drop-view", "select", "views"],
    slug: "create-view",
  },

  // CLAUSES
  {
    id: "where",
    title: "WHERE",
    category: "clause",
    description: "Filters records based on a specified condition.",
    syntax: "SELECT column1, column2, ... FROM table_name WHERE condition;",
    examples: [
      "SELECT * FROM Products WHERE price > 50;",
      "SELECT * FROM Customers WHERE last_name = 'Smith';",
      "SELECT * FROM Orders WHERE order_date > '2023-01-01';",
    ],
    relatedTerms: ["select", "from", "and", "or"],
    slug: "where",
  },
  {
    id: "from",
    title: "FROM",
    category: "clause",
    description:
      "Specifies the table or tables from which to retrieve data in a SELECT statement.",
    syntax: "SELECT column1, column2, ... FROM table_name;",
    examples: [
      "SELECT * FROM Customers;",
      "SELECT o.order_id, c.name FROM Orders o, Customers c WHERE o.customer_id = c.customer_id;",
    ],
    relatedTerms: ["select", "join"],
    slug: "from",
  },
  {
    id: "join",
    title: "JOIN",
    category: "clause",
    description:
      "Combines rows from two or more tables based on a related column.",
    syntax:
      "SELECT columns FROM table1 JOIN table2 ON table1.column = table2.column;",
    examples: [
      "SELECT Customers.name, Orders.order_id FROM Customers JOIN Orders ON Customers.customer_id = Orders.customer_id;",
      "SELECT p.name, c.category_name FROM Products p JOIN Categories c ON p.category_id = c.category_id;",
    ],
    relatedTerms: ["inner-join", "left-join", "right-join", "full-join"],
    slug: "join",
  },
  {
    id: "inner-join",
    title: "INNER JOIN",
    category: "clause",
    description:
      "Returns records that have matching values in both tables. This is the default JOIN type.",
    syntax:
      "SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column;",
    examples: [
      "SELECT Customers.name, Orders.order_id FROM Customers INNER JOIN Orders ON Customers.customer_id = Orders.customer_id;",
    ],
    relatedTerms: ["join", "left-join", "right-join", "full-join"],
    slug: "inner-join",
  },
  {
    id: "left-join",
    title: "LEFT JOIN",
    category: "clause",
    description:
      "Returns all records from the left table and the matched records from the right table. The result is NULL from the right side when there is no match.",
    syntax:
      "SELECT columns FROM table1 LEFT JOIN table2 ON table1.column = table2.column;",
    examples: [
      "SELECT Customers.name, Orders.order_id FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id;",
    ],
    relatedTerms: ["join", "inner-join", "right-join", "full-join"],
    slug: "left-join",
  },
  {
    id: "right-join",
    title: "RIGHT JOIN",
    category: "clause",
    description:
      "Returns all records from the right table and the matched records from the left table. The result is NULL from the left side when there is no match.",
    syntax:
      "SELECT columns FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;",
    examples: [
      "SELECT Orders.order_id, Customers.name FROM Orders RIGHT JOIN Customers ON Orders.customer_id = Customers.customer_id;",
    ],
    relatedTerms: ["join", "inner-join", "left-join", "full-join"],
    slug: "right-join",
  },
  {
    id: "full-join",
    title: "FULL JOIN",
    category: "clause",
    description:
      "Returns all records when there is a match in either left or right table. FULL JOIN can potentially return very large result sets.",
    syntax:
      "SELECT columns FROM table1 FULL JOIN table2 ON table1.column = table2.column;",
    examples: [
      "SELECT Customers.name, Orders.order_id FROM Customers FULL JOIN Orders ON Customers.customer_id = Orders.customer_id;",
    ],
    relatedTerms: ["join", "inner-join", "left-join", "right-join"],
    slug: "full-join",
  },
  {
    id: "group-by",
    title: "GROUP BY",
    category: "clause",
    description: "Groups rows that have the same values into summary rows.",
    syntax:
      "SELECT column1, aggregate_function(column2) FROM table_name GROUP BY column1;",
    examples: [
      "SELECT category, COUNT(*) FROM Products GROUP BY category;",
      "SELECT department, AVG(salary) FROM Employees GROUP BY department;",
    ],
    relatedTerms: ["having", "aggregate-functions", "count", "sum", "avg"],
    slug: "group-by",
  },
  {
    id: "having",
    title: "HAVING",
    category: "clause",
    description:
      "Filters groups based on a specified condition in a GROUP BY query. Similar to WHERE but applies to groups instead of individual rows.",
    syntax:
      "SELECT column1, aggregate_function(column2) FROM table_name GROUP BY column1 HAVING condition;",
    examples: [
      "SELECT category, COUNT(*) FROM Products GROUP BY category HAVING COUNT(*) > 5;",
      "SELECT department, AVG(salary) FROM Employees GROUP BY department HAVING AVG(salary) > 50000;",
    ],
    relatedTerms: ["group-by", "where", "aggregate-functions"],
    slug: "having",
  },
  {
    id: "order-by",
    title: "ORDER BY",
    category: "clause",
    description: "Sorts the result set in ascending or descending order.",
    syntax:
      "SELECT column1, column2, ... FROM table_name ORDER BY column1 [ASC|DESC];",
    examples: [
      "SELECT * FROM Products ORDER BY price DESC;",
      "SELECT * FROM Customers ORDER BY last_name ASC, first_name ASC;",
    ],
    relatedTerms: ["select", "limit"],
    slug: "order-by",
  },
  {
    id: "limit",
    title: "LIMIT",
    category: "clause",
    description:
      "Constrains the number of rows returned by a query. Useful for pagination and performance optimization.",
    syntax: "SELECT column1, column2, ... FROM table_name LIMIT number;",
    examples: [
      "SELECT * FROM Products ORDER BY price DESC LIMIT 10;",
      "SELECT * FROM Customers LIMIT 20 OFFSET 40;",
    ],
    relatedTerms: ["offset", "order-by"],
    slug: "limit",
  },
  {
    id: "offset",
    title: "OFFSET",
    category: "clause",
    description:
      "Specifies the number of rows to skip before starting to return rows from the query. Often used with LIMIT for pagination.",
    syntax:
      "SELECT column1, column2, ... FROM table_name LIMIT number OFFSET offset_value;",
    examples: [
      "SELECT * FROM Products LIMIT 10 OFFSET 20;",
      "SELECT * FROM Customers ORDER BY last_name LIMIT 15 OFFSET 30;",
    ],
    relatedTerms: ["limit", "order-by"],
    slug: "offset",
  },
  {
    id: "set",
    title: "SET",
    category: "clause",
    description:
      "Specifies which columns and values should be updated in an UPDATE statement.",
    syntax:
      "UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;",
    examples: [
      "UPDATE Customers SET email = 'new@example.com', last_update = CURRENT_TIMESTAMP WHERE customer_id = 5;",
      "UPDATE Products SET price = price * 1.1, updated_at = CURRENT_DATE WHERE category = 'Electronics';",
    ],
    relatedTerms: ["update", "where"],
    slug: "set",
  },
  {
    id: "values",
    title: "VALUES",
    category: "clause",
    description:
      "Specifies the values to be inserted into a table in an INSERT statement.",
    syntax:
      "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);",
    examples: [
      "INSERT INTO Customers (first_name, last_name, email) VALUES ('John', 'Doe', 'john@example.com');",
      "INSERT INTO Products (name, price, category) VALUES ('Smartphone', 599.99, 'Electronics'), ('Laptop', 1299.99, 'Electronics');",
    ],
    relatedTerms: ["insert"],
    slug: "values",
  },

  // FUNCTIONS
  {
    id: "count",
    title: "COUNT()",
    category: "function",
    description: "Returns the number of rows that match a specified criterion.",
    syntax: "COUNT(column_name) or COUNT(*)",
    examples: [
      "SELECT COUNT(*) FROM Customers;",
      "SELECT category, COUNT(product_id) FROM Products GROUP BY category;",
    ],
    relatedTerms: ["aggregate-functions", "sum", "avg", "min", "max"],
    slug: "count",
  },
  {
    id: "sum",
    title: "SUM()",
    category: "function",
    description: "Returns the total sum of a numeric column.",
    syntax: "SUM(column_name)",
    examples: [
      "SELECT SUM(total_amount) FROM Orders;",
      "SELECT customer_id, SUM(total_amount) FROM Orders GROUP BY customer_id;",
    ],
    relatedTerms: ["aggregate-functions", "count", "avg", "min", "max"],
    slug: "sum",
  },
  {
    id: "avg",
    title: "AVG()",
    category: "function",
    description: "Returns the average value of a numeric column.",
    syntax: "AVG(column_name)",
    examples: [
      "SELECT AVG(price) FROM Products;",
      "SELECT category, AVG(price) FROM Products GROUP BY category;",
    ],
    relatedTerms: ["aggregate-functions", "count", "sum", "min", "max"],
    slug: "avg",
  },
  {
    id: "min",
    title: "MIN()",
    category: "function",
    description: "Returns the smallest value of the selected column.",
    syntax: "MIN(column_name)",
    examples: [
      "SELECT MIN(price) FROM Products;",
      "SELECT category, MIN(price) FROM Products GROUP BY category;",
    ],
    relatedTerms: ["aggregate-functions", "count", "sum", "avg", "max"],
    slug: "min",
  },
  {
    id: "max",
    title: "MAX()",
    category: "function",
    description: "Returns the largest value of the selected column.",
    syntax: "MAX(column_name)",
    examples: [
      "SELECT MAX(price) FROM Products;",
      "SELECT category, MAX(price) FROM Products GROUP BY category;",
    ],
    relatedTerms: ["aggregate-functions", "count", "sum", "avg", "min"],
    slug: "max",
  },
  {
    id: "concatenate",
    title: "CONCAT()",
    category: "function",
    description: "Joins two or more strings together.",
    syntax: "CONCAT(string1, string2, ...)",
    examples: [
      "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM Customers;",
      "SELECT CONCAT('Product: ', name, ' - $', price) AS product_info FROM Products;",
    ],
    relatedTerms: ["string-functions"],
    slug: "concatenate",
  },
  {
    id: "substring",
    title: "SUBSTRING()",
    category: "function",
    description:
      "Extracts a substring from a string starting at a specified position with a specified length.",
    syntax: "SUBSTRING(string, start_position, length)",
    examples: [
      "SELECT SUBSTRING(name, 1, 10) FROM Products;",
      "SELECT product_id, SUBSTRING(description, 1, 50) || '...' FROM Products WHERE LENGTH(description) > 50;",
    ],
    relatedTerms: ["string-functions", "concatenate"],
    slug: "substring",
  },
  {
    id: "upper",
    title: "UPPER()",
    category: "function",
    description: "Converts a string to uppercase.",
    syntax: "UPPER(string)",
    examples: [
      "SELECT UPPER(last_name) FROM Customers;",
      "SELECT name, UPPER(category) FROM Products;",
    ],
    relatedTerms: ["string-functions", "lower"],
    slug: "upper",
  },
  {
    id: "lower",
    title: "LOWER()",
    category: "function",
    description: "Converts a string to lowercase.",
    syntax: "LOWER(string)",
    examples: [
      "SELECT LOWER(email) FROM Customers;",
      "SELECT product_id, LOWER(name) FROM Products;",
    ],
    relatedTerms: ["string-functions", "upper"],
    slug: "lower",
  },
  {
    id: "round",
    title: "ROUND()",
    category: "function",
    description:
      "Rounds a numeric value to a specified number of decimal places.",
    syntax: "ROUND(number, decimals)",
    examples: [
      "SELECT ROUND(price, 2) FROM Products;",
      "SELECT AVG(ROUND(price, 0)) FROM Products;",
    ],
    relatedTerms: ["numeric-functions", "ceiling", "floor"],
    slug: "round",
  },
  {
    id: "current-date",
    title: "CURRENT_DATE",
    category: "function",
    description: "Returns the current date in the database system.",
    syntax: "CURRENT_DATE",
    examples: [
      "SELECT CURRENT_DATE;",
      "SELECT * FROM Orders WHERE order_date = CURRENT_DATE;",
    ],
    relatedTerms: ["date-functions", "current-timestamp"],
    slug: "current-date",
  },
  {
    id: "current-timestamp",
    title: "CURRENT_TIMESTAMP",
    category: "function",
    description: "Returns the current date and time in the database system.",
    syntax: "CURRENT_TIMESTAMP",
    examples: [
      "SELECT CURRENT_TIMESTAMP;",
      "INSERT INTO Logs (event, timestamp) VALUES ('Login', CURRENT_TIMESTAMP);",
    ],
    relatedTerms: ["date-functions", "current-date"],
    slug: "current-timestamp",
  },
  {
    id: "coalesce",
    title: "COALESCE()",
    category: "function",
    description:
      "Returns the first non-NULL expression among its arguments. Useful for handling NULL values.",
    syntax: "COALESCE(expression1, expression2, ...)",
    examples: [
      "SELECT name, COALESCE(phone, email, 'No Contact Info') AS contact FROM Customers;",
      "SELECT product_id, COALESCE(description, 'No description available') FROM Products;",
    ],
    relatedTerms: ["null"],
    slug: "coalesce",
  },

  // OPERATORS
  {
    id: "and",
    title: "AND",
    category: "operator",
    description:
      "Logical operator that filters records based on multiple conditions. All conditions must be TRUE for a record to be included in the result.",
    syntax: "condition1 AND condition2",
    examples: [
      "SELECT * FROM Products WHERE price > 50 AND category = 'Electronics';",
      "SELECT * FROM Customers WHERE country = 'USA' AND state = 'CA' AND status = 'active';",
    ],
    relatedTerms: ["where", "or", "not"],
    slug: "and",
  },
  {
    id: "or",
    title: "OR",
    category: "operator",
    description:
      "Logical operator that filters records based on multiple conditions. At least one condition must be TRUE for a record to be included in the result.",
    syntax: "condition1 OR condition2",
    examples: [
      "SELECT * FROM Products WHERE category = 'Electronics' OR category = 'Computers';",
      "SELECT * FROM Customers WHERE country = 'USA' OR country = 'Canada';",
    ],
    relatedTerms: ["where", "and", "not"],
    slug: "or",
  },
  {
    id: "not",
    title: "NOT",
    category: "operator",
    description:
      "Logical operator that returns records that do not match the condition specified after NOT.",
    syntax: "NOT condition",
    examples: [
      "SELECT * FROM Products WHERE NOT category = 'Electronics';",
      "SELECT * FROM Customers WHERE NOT (age < 18);",
    ],
    relatedTerms: ["where", "and", "or"],
    slug: "not",
  },
  {
    id: "in",
    title: "IN",
    category: "operator",
    description:
      "Matches any value in a list of values. More efficient than multiple OR conditions.",
    syntax: "column_name IN (value1, value2, ...)",
    examples: [
      "SELECT * FROM Products WHERE category IN ('Electronics', 'Computers', 'Accessories');",
      "SELECT * FROM Customers WHERE country IN ('USA', 'Canada', 'Mexico');",
    ],
    relatedTerms: ["where", "not-in", "or"],
    slug: "in",
  },
  {
    id: "between",
    title: "BETWEEN",
    category: "operator",
    description:
      "Matches values within a specified range, inclusive of the boundaries.",
    syntax: "column_name BETWEEN value1 AND value2",
    examples: [
      "SELECT * FROM Products WHERE price BETWEEN 100 AND 500;",
      "SELECT * FROM Orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';",
    ],
    relatedTerms: ["where", "not-between", "and"],
    slug: "between",
  },
  {
    id: "like",
    title: "LIKE",
    category: "operator",
    description:
      "Matches string patterns using wildcards. % represents zero or more characters, _ represents a single character.",
    syntax: "column_name LIKE pattern",
    examples: [
      "SELECT * FROM Customers WHERE last_name LIKE 'S%';",
      "SELECT * FROM Products WHERE name LIKE '%phone%';",
    ],
    relatedTerms: ["where", "wildcards"],
    slug: "like",
  },
  {
    id: "is-null",
    title: "IS NULL",
    category: "operator",
    description:
      "Matches NULL values. NULL means a value is unknown or missing and cannot be compared using standard operators like =.",
    syntax: "column_name IS NULL",
    examples: [
      "SELECT * FROM Customers WHERE phone IS NULL;",
      "SELECT * FROM Products WHERE description IS NULL;",
    ],
    relatedTerms: ["where", "is-not-null", "null"],
    slug: "is-null",
  },
  {
    id: "is-not-null",
    title: "IS NOT NULL",
    category: "operator",
    description:
      "Matches non-NULL values. Used to find records where a column has a value (is not empty or unknown).",
    syntax: "column_name IS NOT NULL",
    examples: [
      "SELECT * FROM Customers WHERE phone IS NOT NULL;",
      "SELECT * FROM Products WHERE description IS NOT NULL;",
    ],
    relatedTerms: ["where", "is-null", "null"],
    slug: "is-not-null",
  },

  // CONCEPTS
  {
    id: "primary-key",
    title: "Primary Key",
    category: "concept",
    description:
      "A column or set of columns that uniquely identifies each row in a table.",
    examples: [
      "CREATE TABLE Customers (customer_id INTEGER PRIMARY KEY, name TEXT);",
    ],
    relatedTerms: ["foreign-key", "unique-constraint"],
    slug: "primary-key",
  },
  {
    id: "foreign-key",
    title: "Foreign Key",
    category: "concept",
    description:
      "A column or set of columns that establishes a link between data in two tables. It references the primary key of another table, creating a relationship between tables.",
    examples: [
      "CREATE TABLE Orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, FOREIGN KEY (customer_id) REFERENCES Customers(customer_id));",
    ],
    relatedTerms: ["primary-key", "relationships", "referential-integrity"],
    slug: "foreign-key",
  },
  {
    id: "transaction",
    title: "Transaction",
    category: "concept",
    description:
      "A logical unit of work that contains one or more SQL statements. Transactions ensure database consistency by following the ACID properties. All statements in a transaction either complete successfully or the entire transaction is rolled back.",
    examples: [
      "BEGIN TRANSACTION; UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1; UPDATE Accounts SET balance = balance + 100 WHERE account_id = 2; COMMIT;",
      "BEGIN; INSERT INTO Orders (customer_id, amount) VALUES (1, 499.99); INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (LAST_INSERT_ID(), 101, 2); COMMIT;",
    ],
    relatedTerms: ["acid", "commit", "rollback"],
    slug: "transaction",
  },
  {
    id: "acid",
    title: "ACID Properties",
    category: "concept",
    description:
      "A set of properties that guarantee database transactions are processed reliably. ACID stands for Atomicity (all or nothing operations), Consistency (database remains in a valid state), Isolation (concurrent transactions don't interfere), and Durability (completed transactions persist).",
    relatedTerms: ["transaction", "database-integrity"],
    slug: "acid",
  },
  {
    id: "indexes",
    title: "Indexes",
    category: "concept",
    description:
      "Database structures that improve the speed of data retrieval operations at the cost of additional storage space and slower write operations. Indexes are similar to a book's table of contents, providing quicker access to specific data.",
    examples: [
      "CREATE INDEX idx_customer_email ON Customers (email);",
      "CREATE UNIQUE INDEX idx_product_sku ON Products (sku);",
    ],
    relatedTerms: ["create-index", "performance-optimization"],
    slug: "indexes",
  },
  {
    id: "views",
    title: "Views",
    category: "concept",
    description:
      "Virtual tables based on the result set of a SELECT query. Views don't store data physically but provide a way to present data in a specific format, hiding complexity and providing an additional security layer.",
    examples: [
      "CREATE VIEW ActiveCustomers AS SELECT * FROM Customers WHERE status = 'active';",
      "CREATE VIEW SalesSummary AS SELECT category, SUM(amount) as total FROM Sales GROUP BY category;",
    ],
    relatedTerms: ["create-view", "select"],
    slug: "views",
  },
  {
    id: "normalization",
    title: "Normalization",
    category: "concept",
    description:
      "The process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller, related tables and defining relationships between them using foreign keys.",
    relatedTerms: ["database-design", "foreign-key", "relationships"],
    slug: "normalization",
  },
  {
    id: "data-types",
    title: "Data Types",
    category: "concept",
    description:
      "Attributes that specify the type of data that can be stored in a database column. Common SQL data types include INTEGER, TEXT, REAL, DATE, BOOLEAN, VARCHAR, and more. Data types help ensure data integrity and optimize storage.",
    examples: [
      "CREATE TABLE Products (product_id INTEGER, name TEXT, price REAL, in_stock BOOLEAN, description TEXT);",
    ],
    relatedTerms: ["create-table", "schema"],
    slug: "data-types",
  },
  {
    id: "null",
    title: "NULL",
    category: "concept",
    description:
      "A special value that represents the absence of a value or an unknown value in a database. NULL is not the same as zero, an empty string, or a blank space. NULL requires special handling in queries using IS NULL or IS NOT NULL operators.",
    examples: [
      "SELECT * FROM Customers WHERE phone IS NULL;",
      "UPDATE Products SET description = NULL WHERE description = '';",
    ],
    relatedTerms: ["is-null", "is-not-null", "coalesce"],
    slug: "null",
  },
  {
    id: "wildcards",
    title: "Wildcards",
    category: "concept",
    description:
      "Special characters used in string matching operations with the LIKE operator. The percent sign (%) represents any sequence of characters, while the underscore (_) represents any single character.",
    examples: [
      "SELECT * FROM Customers WHERE last_name LIKE 'S%';",
      "SELECT * FROM Products WHERE code LIKE 'ABC-___';",
    ],
    relatedTerms: ["like", "pattern-matching"],
    slug: "wildcards",
  },
  {
    id: "aggregate-functions",
    title: "Aggregate Functions",
    category: "concept",
    description:
      "Functions that perform a calculation on multiple rows and return a single value. Common aggregate functions include COUNT(), SUM(), AVG(), MIN(), and MAX(). They are often used with the GROUP BY clause.",
    examples: [
      "SELECT COUNT(*) FROM Customers;",
      "SELECT category, AVG(price) FROM Products GROUP BY category;",
    ],
    relatedTerms: ["count", "sum", "avg", "min", "max", "group-by"],
    slug: "aggregate-functions",
  },
  {
    id: "string-functions",
    title: "String Functions",
    category: "concept",
    description:
      "Functions that manipulate character strings in SQL. Common string functions include CONCAT(), SUBSTRING(), UPPER(), LOWER(), LENGTH(), and TRIM(). They help with string transformations and comparisons.",
    examples: [
      "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM Customers;",
      "SELECT name, UPPER(category) FROM Products;",
    ],
    relatedTerms: ["concatenate", "substring", "upper", "lower"],
    slug: "string-functions",
  },
  {
    id: "date-functions",
    title: "Date Functions",
    category: "concept",
    description:
      "Functions that manipulate date and time values in SQL. They help extract parts of dates, calculate time differences, and format dates. Examples include EXTRACT(), DATE_ADD(), and CURRENT_DATE.",
    examples: [
      "SELECT * FROM Orders WHERE EXTRACT(YEAR FROM order_date) = 2023;",
      "SELECT CURRENT_DATE;",
    ],
    relatedTerms: ["current-date", "current-timestamp"],
    slug: "date-functions",
  },
];

export const glossaryCategories = [
  { id: "all", label: "All Terms" },
  { id: "command", label: "Commands" },
  { id: "clause", label: "Clauses" },
  { id: "concept", label: "Concepts" },
  { id: "function", label: "Functions" },
  { id: "operator", label: "Operators" },
];

export function getAllGlossaryTerms() {
  return glossaryTerms;
}

export function getGlossaryTermBySlug(slug: string) {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function getGlossaryTermsByCategory(category: string) {
  if (category === "all") {
    return glossaryTerms;
  }
  return glossaryTerms.filter((term) => term.category === category);
}

export function searchGlossaryTerms(query: string) {
  const searchLower = query.toLowerCase();
  return glossaryTerms.filter(
    (term) =>
      term.title.toLowerCase().includes(searchLower) ||
      term.description.toLowerCase().includes(searchLower)
  );
}

export function getAlphabeticalIndex() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const index: Record<string, number> = {};

  alphabet.forEach((letter) => {
    const count = glossaryTerms.filter((term) =>
      term.title.toUpperCase().startsWith(letter)
    ).length;
    if (count > 0) {
      index[letter] = count;
    }
  });

  return index;
}

export function getRelatedTerms(termId: string) {
  const term = glossaryTerms.find((t) => t.id === termId);
  if (!term || !term.relatedTerms || term.relatedTerms.length === 0) {
    return [];
  }

  return term.relatedTerms
    .map((relatedId) => glossaryTerms.find((t) => t.id === relatedId))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
