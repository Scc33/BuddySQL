import React from "react";
import Link from "next/link";
import { Lesson } from "@/types/lesson";

interface LessonNavigationProps {
  previousLesson?: Lesson;
  nextLesson?: Lesson;
  currentLessonCompleted?: boolean;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  previousLesson,
  nextLesson,
  currentLessonCompleted = false,
}) => {
  return (
    <div className="flex justify-between items-center py-4 border-t">
      <div>
        {previousLesson ? (
          <Link
            href={`/lessons/${previousLesson.slug}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {previousLesson.title}
          </Link>
        ) : (
          <Link
            href="/lessons"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            All Lessons
          </Link>
        )}
      </div>
      <div>
        {nextLesson && (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
              ${
                currentLessonCompleted
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            aria-disabled={!currentLessonCompleted}
            tabIndex={currentLessonCompleted ? 0 : -1}
            onClick={(e) => !currentLessonCompleted && e.preventDefault()}
          >
            {nextLesson.title}
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonNavigation;
