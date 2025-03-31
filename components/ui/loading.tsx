import React from "react";

interface LoadingProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  title = "Loading...",
  subtitle = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            {title && (
              <p className="text-lg font-medium text-gray-700">{title}</p>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-2">
                This may take a moment to initialize.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
