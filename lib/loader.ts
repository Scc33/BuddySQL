import sqlWasmPath from "sql.js/dist/sql-wasm.wasm";

/**
 * Load SQL.js with the WebAssembly module
 * @returns Promise that resolves to SQL.js factory
 */
export async function loadSqlJs() {
  try {
    // Dynamically import SQL.js to avoid SSR issues
    const initSqlJs = (await import("sql.js")).default;

    // Initialize with the WebAssembly file
    return await initSqlJs({
      locateFile: () => sqlWasmPath,
    });
  } catch (error) {
    console.error("Failed to load SQL.js:", error);
    throw new Error("Failed to load SQL database engine");
  }
}
