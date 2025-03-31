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
    return <code className="prose-code">{children}</code>;
  }

  return (
    <div className="my-4 rounded-md overflow-hidden">
      <div className="px-4 py-2 bg-gray-700 text-gray-200 text-xs font-medium">
        {language || "Code"}
      </div>
      <pre className="prose-pre">
        <code className="prose-pre-code">{children}</code>
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
            h1: ({ node, ...props }) => <h1 className="prose-h1" {...props} />,
            h2: ({ node, ...props }) => <h2 className="prose-h2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="prose-h3" {...props} />,
            p: ({ node, ...props }) => <div className="prose-p" {...props} />,
            ul: ({ node, ...props }) => <ul className="prose-ul" {...props} />,
            ol: ({ node, ...props }) => <ol className="prose-ol" {...props} />,
            li: ({ node, ...props }) => <li className="prose-li" {...props} />,
            code: CodeBlock,
          }}
        >
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
};
