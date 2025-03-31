"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SqlEditor } from "@/components/lessons/SqlEditor";
import { LessonContent } from "@/components/lessons/LessonContent";
import LessonNavigation from "@/components/lessons/LessonNavigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  getLessonBySlug,
  getNextLesson,
  getPreviousLesson,
  initializeDatabase,
} from "@/lib/lessons";
import { UserProgress, LessonProgress } from "@/types/lesson";
import {
  SqliteProvider,
  useSqlite,
  SqliteLoading,
  SqliteError,
} from "@/components/database/SqliteProvider";

const initialProgress: UserProgress = {
  lessons: {},
};

// This wrapper ensures SqliteProvider is only mounted on the client
function LessonPageContent({ params }: { params: { slug: string } }) {
  const [lesson, setLesson] = useState<any>(null);
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    "sql-playground-progress",
    initialProgress
  );
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({
    completed: false,
  });
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  const {
    isLoading,
    error,
    executeQuery,
    initializeDatabase: initDb,
  } = useSqlite();

  // Load lesson data based on slug
  useEffect(() => {
    const lessonData = getLessonBySlug(params.slug);
    if (!lessonData) {
      notFound();
    }
    setLesson(lessonData);

    // Check if lesson has been completed before
    if (userProgress.lessons[lessonData.id]) {
      setLessonProgress(userProgress.lessons[lessonData.id]);

      // If the lesson has a challenge and it's completed, show success message
      if (
        lessonData.challenge &&
        userProgress.lessons[lessonData.id].completed
      ) {
        setShowChallenge(true);
        setChallengeSuccess(true);
      }
    }

    // Update last visited lesson
    setUserProgress((prev) => ({
      ...prev,
      lastLesson: lessonData.id,
    }));
  }, [params.slug, userProgress.lessons, setUserProgress]);

  // Initialize the database
  useEffect(() => {
    if (!isLoading && !error) {
      const sql = initializeDatabase();
      initDb(sql);
    }
  }, [isLoading, error, initDb]);

  if (isLoading) {
    return <SqliteLoading />;
  }

  if (error) {
    return <SqliteError message={error} />;
  }

  if (!lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Handle query execution and progress tracking
  const handleExecuteQuery = (sql: string) => {
    const result = executeQuery(sql);

    // If no error and this is the first lesson, mark it as completed
    if (!result.error && !lessonProgress.completed && !lesson.challenge) {
      updateLessonProgress(true, sql);
    }

    return result;
  };

  // Update user progress
  const updateLessonProgress = (completed: boolean, query: string) => {
    const newProgress: LessonProgress = {
      completed,
      lastAttemptedQuery: query,
      ...(completed ? { completedAt: new Date().toISOString() } : {}),
    };

    setLessonProgress(newProgress);

    setUserProgress((prev) => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        [lesson.id]: newProgress,
      },
    }));
  };

  // Handle challenge query
  const handleChallengeQuery = (sql: string) => {
    const result = executeQuery(sql);

    // Check if challenge is successful
    if (lesson.challenge && !result.error) {
      const validationQuery = lesson.challenge.validation_query;
      let success = false;

      if (validationQuery) {
        // Simple validation: normalize query strings and compare
        const normalizedUserQuery = sql
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
        const normalizedValidationQuery = validationQuery
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();

        success =
          normalizedUserQuery === normalizedValidationQuery ||
          (result.results && result.results.length > 0);
      } else if (result.results && result.results.length > 0) {
        success = true;
      }

      if (success) {
        setChallengeSuccess(true);
        updateLessonProgress(true, sql);
      }

      return result;
    }

    return result;
  };

  const previousLesson = getPreviousLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="mt-2 text-lg text-gray-500">{lesson.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <LessonContent content={lesson.content} />
          </div>

          <div className="space-y-6">
            <SqlEditor
              initialQuery={lesson.initialQuery || ""}
              onExecuteQuery={handleExecuteQuery}
              onSaveProgress={updateLessonProgress}
            />

            {lesson.challenge &&
              (lessonProgress.completed || showChallenge) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{lesson.challenge.description}</p>

                    {challengeSuccess ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                        <p className="font-medium">
                          {lesson.challenge.success_message}
                        </p>
                      </div>
                    ) : (
                      <SqlEditor
                        initialQuery=""
                        onExecuteQuery={handleChallengeQuery}
                        expectedQuery={lesson.challenge.validation_query}
                      />
                    )}
                  </CardContent>
                </Card>
              )}

            {!showChallenge && lesson.challenge && (
              <button
                onClick={() => setShowChallenge(true)}
                className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
              >
                Show Challenge
              </button>
            )}
          </div>
        </div>

        <LessonNavigation
          previousLesson={previousLesson}
          nextLesson={nextLesson}
          currentLessonCompleted={lessonProgress.completed}
        />
      </div>
    </div>
  );
}

// This is the main export that wraps the content with the SQLite provider
export default function LessonPage({ params }: { params: { slug: string } }) {
  return (
    <SqliteProvider>
      <LessonPageContent params={params} />
    </SqliteProvider>
  );
}
