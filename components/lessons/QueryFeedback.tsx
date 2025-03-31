import React from "react";
import { GradeResult } from "@/lib/queryGrader";

interface QueryFeedbackProps {
  gradeResult: GradeResult | null;
}

export const QueryFeedback: React.FC<QueryFeedbackProps> = ({
  gradeResult,
}) => {
  if (!gradeResult) return null;

  const { feedback, hints, type, score } = gradeResult;

  // Define background, text, and border colors based on feedback type
  const colors = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      iconBg: "bg-yellow-100",
      iconText: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
    },
  };

  const colorSet = colors[type];

  return (
    <div
      className={`mt-4 p-4 rounded-md ${colorSet.bg} border ${colorSet.border}`}
    >
      <div className="flex">
        <div className={`flex-shrink-0 ${colorSet.iconBg} rounded-full p-1`}>
          {type === "success" ? (
            <svg
              className={`h-5 w-5 ${colorSet.iconText}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : type === "error" ? (
            <svg
              className={`h-5 w-5 ${colorSet.iconText}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className={`h-5 w-5 ${colorSet.iconText}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-center">
            <p className={`text-sm font-medium ${colorSet.text}`}>
              {type === "success"
                ? "Success"
                : type === "error"
                ? "Error"
                : type === "warning"
                ? "Warning"
                : "Info"}
            </p>
            {score !== undefined && (
              <div className="ml-auto flex-shrink-0">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${colorSet.bg} ${colorSet.text}`}
                >
                  Score: {score}/100
                </span>
              </div>
            )}
          </div>
          <p className={`mt-1 text-sm ${colorSet.text}`}>{feedback}</p>
          {hints && hints.length > 0 && (
            <div className="mt-2">
              <p className={`text-sm font-medium ${colorSet.text}`}>Hints:</p>
              <ul className={`list-disc pl-5 mt-1 text-sm ${colorSet.text}`}>
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryFeedback;
