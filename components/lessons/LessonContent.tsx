"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

// Custom renderer for code blocks
const CodeBlock: React.FC<CodeProps> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  // For SQL code, use a special SQL styling
  if (language.toLowerCase() === "sql") {
    return (
      <div className="my-4 rounded-md overflow-hidden border border-gray-200">
        <div className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 text-xs font-medium">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </span>
          <span>SQL</span>
        </div>
        <pre className="bg-gray-800 p-4 m-0 overflow-x-auto text-gray-200 text-sm font-mono">
          {code}
        </pre>
      </div>
    );
  }

  // For other languages
  return (
    <div className="my-4 rounded-md overflow-hidden border border-gray-200">
      <div className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 text-xs font-medium">
        <span>{language || "Code"}</span>
      </div>
      <pre className="bg-gray-800 p-4 m-0 overflow-x-auto text-gray-200 text-sm font-mono">
        {code}
      </pre>
    </div>
  );
};

interface LessonContentProps {
  content: string;
}

export const LessonContent: React.FC<LessonContentProps> = ({ content }) => {
  return (
    <Card>
      <CardContent className="prose max-w-none py-6">
        <ReactMarkdown
          components={{
            h1: (props) => (
              <h1 className="text-2xl font-bold mb-4 mt-2" {...props} />
            ),
            h2: (props) => (
              <h2 className="text-xl font-semibold mb-3 mt-6" {...props} />
            ),
            h3: (props) => (
              <h3 className="text-lg font-medium mb-2 mt-4" {...props} />
            ),
            p: (props) => <div className="my-3" {...props} />,
            ul: (props) => <ul className="list-disc pl-6 my-3" {...props} />,
            ol: (props) => <ol className="list-decimal pl-6 my-3" {...props} />,
            li: (props) => <li className="mb-1" {...props} />,
            code: CodeBlock,
          }}
        >
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
};
