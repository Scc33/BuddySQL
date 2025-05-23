import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`grid grid-cols-2 px-6 py-4 border-b ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({
  id = "",
  children,
  className = "",
}: CardTitleProps) {
  return (
    <h3 id={id} className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t ${className}`}>
      {children}
    </div>
  );
}
