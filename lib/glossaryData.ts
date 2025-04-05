import { GlossaryTerm } from "@/types/glossary";

export const glossaryTerms: GlossaryTerm[] = [
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
