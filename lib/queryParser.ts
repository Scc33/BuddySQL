/**
 * A simple SQL query parser to extract key components for visualization
 *
 * Note: This is a simplified parser and doesn't handle all SQL syntax variations
 * It's meant for educational purposes to identify basic query structure for visualization
 */

export interface ParsedQuery {
  type: string;
  select: {
    columns: string[];
    allColumns: boolean;
  };
  from: {
    tables: string[];
    alias?: Record<string, string>;
  };
  where?: {
    conditions: string[];
  };
  join?: {
    type: string;
    table: string;
    on: string;
  }[];
  groupBy?: {
    columns: string[];
  };
  orderBy?: {
    columns: string[];
    direction: string;
  };
  limit?: number;
  offset?: number;
}

export function parseQuery(query: string): ParsedQuery {
  // Normalize the query for easier parsing
  const normalizedQuery = query.replace(/\s+/g, " ").trim();

  // Basic structure
  const result: ParsedQuery = {
    type: "UNKNOWN",
    select: {
      columns: [],
      allColumns: false,
    },
    from: {
      tables: [],
      alias: {},
    },
  };

  // Determine query type
  if (normalizedQuery.toUpperCase().startsWith("SELECT")) {
    result.type = "SELECT";
  } else if (normalizedQuery.toUpperCase().startsWith("INSERT")) {
    result.type = "INSERT";
  } else if (normalizedQuery.toUpperCase().startsWith("UPDATE")) {
    result.type = "UPDATE";
  } else if (normalizedQuery.toUpperCase().startsWith("DELETE")) {
    result.type = "DELETE";
  }

  // Only process SELECT queries for now
  if (result.type === "SELECT") {
    // Extract SELECT columns
    const selectMatch = normalizedQuery.match(/SELECT\s+(.*?)\s+FROM/i);
    if (selectMatch && selectMatch[1]) {
      const columnsStr = selectMatch[1];
      if (columnsStr.trim() === "*") {
        result.select.allColumns = true;
      } else {
        // Split columns handling potential functions like COUNT(*)
        const columns = splitWithAwareness(columnsStr);
        result.select.columns = columns.map((col) => col.trim());
      }
    }

    // Extract FROM tables
    const fromMatch = normalizedQuery.match(
      /FROM\s+(.*?)(?:\s+WHERE|\s+GROUP BY|\s+ORDER BY|\s+LIMIT|\s*;|\s*$)/i
    );
    if (fromMatch && fromMatch[1]) {
      const fromClause = fromMatch[1].trim();

      // Check for JOINs
      if (fromClause.toUpperCase().includes("JOIN")) {
        result.join = [];

        // Split out the first table
        const firstTableMatch = fromClause.match(
          /(.*?)(?:\s+(?:LEFT|RIGHT|INNER|OUTER|CROSS|FULL)?\s*JOIN)/i
        );
        if (firstTableMatch && firstTableMatch[1]) {
          const mainTableParts = firstTableMatch[1].trim().split(/\s+/);
          result.from.tables.push(mainTableParts[0]);

          // Check for alias
          if (mainTableParts.length > 1) {
            result.from.alias = result.from.alias || {};
            result.from.alias[mainTableParts[0]] =
              mainTableParts[mainTableParts.length - 1];
          }
        }

        // Extract JOIN clauses
        const joinPattern =
          /(?:(LEFT|RIGHT|INNER|OUTER|CROSS|FULL)?\s*JOIN)\s+(.*?)\s+ON\s+(.*?)(?:\s+(?:LEFT|RIGHT|INNER|OUTER|CROSS|FULL)?\s*JOIN|\s+WHERE|\s+GROUP BY|\s+ORDER BY|\s+LIMIT|\s*;|\s*$)/gi;
        let joinMatch;

        while ((joinMatch = joinPattern.exec(fromClause)) !== null) {
          const joinType = joinMatch[1] ? joinMatch[1].toUpperCase() : "INNER";
          const joinTable = joinMatch[2].trim();
          const joinCondition = joinMatch[3].trim();

          // Extract alias if any
          const tableParts = joinTable.split(/\s+/);
          const actualTable = tableParts[0];
          const tableAlias =
            tableParts.length > 1
              ? tableParts[tableParts.length - 1]
              : actualTable;

          result.from.tables.push(actualTable);
          result.from.alias = result.from.alias || {};
          result.from.alias[actualTable] = tableAlias;

          result.join.push({
            type: joinType,
            table: actualTable,
            on: joinCondition,
          });
        }
      } else {
        // Simple FROM clause
        const tables = fromClause.split(",");
        tables.forEach((table) => {
          const tableParts = table.trim().split(/\s+/);
          const actualTable = tableParts[0];
          result.from.tables.push(actualTable);

          // Check for alias
          if (tableParts.length > 1) {
            result.from.alias = result.from.alias || {};
            result.from.alias[actualTable] = tableParts[tableParts.length - 1];
          }
        });
      }
    }

    // Extract WHERE conditions
    const whereMatch = normalizedQuery.match(
      /WHERE\s+(.*?)(?:\s+GROUP BY|\s+ORDER BY|\s+LIMIT|\s*;|\s*$)/i
    );
    if (whereMatch && whereMatch[1]) {
      result.where = {
        conditions: [whereMatch[1].trim()],
      };
    }

    // Extract GROUP BY
    const groupByMatch = normalizedQuery.match(
      /GROUP BY\s+(.*?)(?:\s+HAVING|\s+ORDER BY|\s+LIMIT|\s*;|\s*$)/i
    );
    if (groupByMatch && groupByMatch[1]) {
      result.groupBy = {
        columns: groupByMatch[1].split(",").map((col) => col.trim()),
      };
    }

    // Extract ORDER BY
    const orderByMatch = normalizedQuery.match(
      /ORDER BY\s+(.*?)(?:\s+LIMIT|\s*;|\s*$)/i
    );
    if (orderByMatch && orderByMatch[1]) {
      const orderByClause = orderByMatch[1].trim();
      const orderDirectionMatch = orderByClause.match(/(.*?)\s+(ASC|DESC)$/i);

      if (orderDirectionMatch) {
        result.orderBy = {
          columns: orderDirectionMatch[1].split(",").map((col) => col.trim()),
          direction: orderDirectionMatch[2].toUpperCase(),
        };
      } else {
        result.orderBy = {
          columns: orderByClause.split(",").map((col) => col.trim()),
          direction: "ASC", // Default
        };
      }
    }

    // Extract LIMIT
    const limitMatch = normalizedQuery.match(
      /LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i
    );
    if (limitMatch) {
      result.limit = parseInt(limitMatch[1], 10);

      if (limitMatch[2]) {
        result.offset = parseInt(limitMatch[2], 10);
      }
    }

    // Check for OFFSET without LIMIT
    if (!result.offset) {
      const offsetMatch = normalizedQuery.match(/OFFSET\s+(\d+)/i);
      if (offsetMatch) {
        result.offset = parseInt(offsetMatch[1], 10);
      }
    }
  }

  return result;
}

// Helper function to split by commas but be aware of function calls like COUNT(*)
function splitWithAwareness(str: string): string[] {
  const result: string[] = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}
