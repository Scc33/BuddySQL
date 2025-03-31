import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
  isActive?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted = false,
  isActive = false,
}) => {
  return (
    <Link href={`/lessons/${lesson.slug}`} passHref>
      <Card
        className={`
        cursor-pointer transition-all duration-200 hover:shadow-lg
        ${isActive ? "ring-2 ring-blue-500" : ""}
        ${isCompleted ? "bg-gray-50" : "bg-white"}
      `}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {lesson.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
            </div>
            <div className="flex-shrink-0">
              {isCompleted ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {lesson.category}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonCard;
