"use client";

import { useEffect, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
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
import { useSqlJs } from "@/hooks/useSqlJs";
import Loading from "@/components/ui/loading";
import { getGradeOptionsForLesson } from "@/lib/lessonGrader";
import { GradeOptions } from "@/lib/queryGrader";
import { PLAYGROUND_KEY } from "@/constants/keys";

const initialProgress: UserProgress = {
  lessons: {},
};

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const initialRender = useRef(true);

  const [lesson, setLesson] = useState<any>(null);
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    PLAYGROUND_KEY,
    initialProgress
  );
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({
    completed: false,
  });
  const [challengeSuccess, setChallengeSuccess] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [challengeGradeOptions, setChallengeGradeOptions] =
    useState<GradeOptions>({});

  const {
    isLoading,
    error,
    executeQuery,
    initializeDatabase: initDb,
    db,
  } = useSqlJs();

  useEffect(() => {
    const lessonData = getLessonBySlug(slug);
    if (!lessonData) {
      notFound();
    }
    setLesson(lessonData);

    // Set grading options for this lesson
    setChallengeGradeOptions(getGradeOptionsForLesson(lessonData.id, true));

    // Check if lesson has been completed before
    if (userProgress.lessons[lessonData.id]) {
      setLessonProgress(userProgress.lessons[lessonData.id]);

      // If the lesson has a challenge and it's completed, show success message
      if (
        lessonData.challenge &&
        userProgress.lessons[lessonData.id].completed
      ) {
        setChallengeSuccess(true);
      }
    }
  }, [slug, userProgress.lessons]);

  useEffect(() => {
    if (lesson && initialRender.current) {
      initialRender.current = false;
      setUserProgress((prev) => ({
        ...prev,
        lastLesson: lesson.id,
      }));
    }
  }, [lesson, setUserProgress]);

  // Initialize the database once when ready
  useEffect(() => {
    if (db && !dbInitialized) {
      const sql = initializeDatabase();
      const success = initDb(sql);
      if (success) {
        setDbInitialized(true);
      }
    }
  }, [db, dbInitialized, initDb]);

  if (isLoading) {
    return (
      <Loading
        title="Loading SQL engine..."
        subtitle="This may take a moment to initialize"
      />
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error Loading SQL Engine
          </h3>
          <p className="text-red-700">{error}</p>
          <p className="mt-4 text-red-600">
            Try refreshing the page or check your console for more details.
          </p>
        </div>
      </div>
    );
  }

  if (!dbInitialized) {
    return <Loading title="Initializing database..." />;
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

  const previousLesson = getPreviousLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);
  console.log(lesson.challenge && " md:grid-cols-2");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="mt-2 text-lg text-gray-500">{lesson.description}</p>
        </div>

        <div
          className={"grid gap-8 " + (lesson.challenge && " md:grid-cols-2")}
        >
          <div>
            <LessonContent content={lesson.content} />
          </div>

          <div className="space-y-6">
            {lesson.challenge && (
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
                      initialQuery={lesson.initialQuery}
                      onExecuteQuery={handleExecuteQuery}
                      onSaveProgress={updateLessonProgress}
                      expectedQuery={lesson.challenge.validation_query}
                      gradeOptions={challengeGradeOptions}
                    />
                  )}
                </CardContent>
              </Card>
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
