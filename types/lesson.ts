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
  };
}

export interface LessonProgress {
  completed: boolean;
  lastAttemptedQuery?: string;
  completedAt?: string;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  lastLesson?: string;
}
