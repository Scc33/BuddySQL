export interface GlossaryTerm {
  id: string;
  title: string;
  category: "command" | "concept" | "function" | "clause" | "operator";
  description: string;
  syntax?: string;
  examples?: string[];
  relatedTerms?: string[];
  slug: string;
}

export type GlossaryCategory = GlossaryTerm["category"];

export interface GlossaryState {
  activeFilter: string;
  searchQuery: string;
}
