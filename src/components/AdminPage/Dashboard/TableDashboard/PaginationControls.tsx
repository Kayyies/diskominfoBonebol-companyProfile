// PaginationControls.tsx
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (pageNumber: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onGoToPage,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <div className="flex items-center gap-2">
        <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
          Page
        </p>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => onGoToPage(Number(e.target.value))}
          min="1"
          max={totalPages}
          aria-label="Page Number"
          className="custom-number-input w-12 rounded-lg border border-gray-900 bg-transparent px-2 py-1 text-center font-sans text-xs font-bold uppercase text-gray-900 transition-all focus:ring focus:ring-gray-300"
        />
        <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
          of {totalPages}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="select-none rounded-lg border border-gray-900 px-4 py-2 text-center font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Previous
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="select-none rounded-lg border border-gray-900 px-4 py-2 text-center font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
