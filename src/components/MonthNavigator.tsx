import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- MODIFICATION 1: UPDATE THE PROPS INTERFACE ---
// It now expects the onNext and onPrev functions from its parent.
interface MonthNavigatorProps {
  currentMonth: number;
  onNext: () => void;
  onPrev: () => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ currentMonth, onNext, onPrev }) => {
  // --- MODIFICATION 2: REMOVE THE OLD LOGIC ---
  // The logic for nextMonth and prevMonth is now handled in App.tsx.
  // We can delete these functions entirely.
  // const nextMonth = ... (DELETED)
  // const prevMonth = ... (DELETED)

  return (
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
      <button
        // --- MODIFICATION 3: USE THE onPrev PROP ---
        onClick={onPrev}
        // Add a disabled state for better UX
        disabled={currentMonth === 1}
        className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800">Month {currentMonth}</h2>

      <button
        // --- MODIFICATION 4: USE THE onNext PROP ---
        onClick={onNext}
        // Add a disabled state for better UX
        disabled={currentMonth === 9}
        className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MonthNavigator;