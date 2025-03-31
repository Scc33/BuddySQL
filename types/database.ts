export interface SqlResult {
  columns: string[];
  values: any[][];
}

export interface SqlError {
  message: string;
  code?: string;
}

export interface DatabaseState {
  db: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface QueryResult {
  results: SqlResult[] | null;
  error: SqlError | null;
  executionTime?: number;
}
