"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Custom renderer for code blocks
const CodeBlock: React.FC<CodeProps> = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (inline) {
    return (
      <code className="px-1 py-0.5 bg-gray-100 rounded font-mono text-sm">
        {children}
      </code>
    );
  }

  return (
    <div className="my-4 rounded-md overflow-hidden">
      <div className="px-4 py-2 bg-gray-700 text-gray-200 text-xs font-medium">
        {language || "Code"}
      </div>
      <pre className="p-4 bg-gray-800 overflow-x-auto">
        <code className="text-gray-200 font-mono text-sm">{children}</code>
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
      <CardContent className="prose prose-blue max-w-none py-6">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-4 mt-0" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-medium mt-5 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => <p className="my-3" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 my-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 my-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="my-1" {...props} />,
            code: CodeBlock,
          }}
        >
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
};
