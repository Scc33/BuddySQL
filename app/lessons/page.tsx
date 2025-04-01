"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LessonCard from "@/components/lessons/LessonCard";
import { lessons, lessonCategories } from "@/lib/lessons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProgress } from "@/types/lesson";
import { PLAYGROUND_KEY } from "@/constants/keys";

const initialProgress: UserProgress = {
  lessons: {},
};

export default function LessonsPage() {
  const [userProgress] = useLocalStorage<UserProgress>(
    PLAYGROUND_KEY,
    initialProgress
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Determine if the user has any lessons in progress
  useEffect(() => {
    // Default to the category of the first incomplete lesson or first category
    if (!selectedCategory) {
      const firstIncomplete = lessons.find(
        (lesson) => !userProgress.lessons[lesson.id]?.completed
      );

      if (firstIncomplete) {
        setSelectedCategory(firstIncomplete.category);
      } else {
        // If all lessons are complete or none are started, default to first category
        setSelectedCategory(lessonCategories[0].name);
      }
    }
  }, [selectedCategory, userProgress.lessons]);

  // Filter lessons by category
  const filteredLessons = selectedCategory
    ? lessons.filter((lesson) => lesson.category === selectedCategory)
    : lessons;

  // Sort by order
  const sortedLessons = [...filteredLessons].sort((a, b) => a.order - b.order);

  // Calculate user progress stats
  const totalCompleted = Object.values(userProgress.lessons).filter(
    (l) => l.completed
  ).length;
  const totalLessons = lessons.length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {totalCompleted} of {totalLessons} lessons completed
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {lessonCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer
                  ${
                    selectedCategory === category.name
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={userProgress.lessons[lesson.id]?.completed}
              isActive={userProgress.lastLesson === lesson.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
