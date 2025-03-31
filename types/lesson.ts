export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  order: number;
  category: string;
  initialQuery?: string;
  expectedResult?: string;
  hints?: string[];
  challenge?: {
    description: string;
    success_message: string;
    validation_query?: string;
    expected_result?: any;
    grading_criteria?: {
      required_elements?: string[];
      expected_columns?: string[];
      expected_row_count?: number;
    };
  };
}

export interface LessonProgress {
  completed: boolean;
  lastAttemptedQuery?: string;
  completedAt?: string;
  score?: number;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  lastLesson?: string;
  totalScore?: number;
}
