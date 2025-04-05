import React from "react";

interface AlphabeticalIndexProps {
  index: Record<string, number>;
  activeLetter: string | null;
  onLetterClick: (letter: string) => void;
}

const AlphabeticalIndex: React.FC<AlphabeticalIndexProps> = ({
  index,
  activeLetter,
  onLetterClick,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap gap-1">
      {alphabet.map((letter) => {
        const hasTerms = index[letter] && index[letter] > 0;
        return (
          <button
            key={letter}
            className={`
              w-7 h-7 flex items-center justify-center rounded text-sm font-medium cursor-pointer
              ${
                hasTerms
                  ? activeLetter === letter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-300 cursor-not-allowed"
              }
            `}
            onClick={() => hasTerms && onLetterClick(letter)}
            disabled={!hasTerms}
            aria-pressed={activeLetter === letter}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default AlphabeticalIndex;
