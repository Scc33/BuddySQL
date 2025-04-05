import React from "react";
import { glossaryCategories } from "@/lib/glossaryData";

interface GlossaryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const GlossaryFilters: React.FC<GlossaryFiltersProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-2">
      {glossaryCategories.map((category) => (
        <button
          key={category.id}
          className={`block w-full text-left px-3 py-2 rounded text-sm cursor-pointer ${
            activeCategory === category.id
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default GlossaryFilters;
