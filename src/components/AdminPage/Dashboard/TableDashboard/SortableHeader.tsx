// SortableHeader.tsx
import React from "react";

interface SortableHeaderProps {
  header: string;
  index: number;
  isSorted: boolean;
  sortDirection: "asc" | "desc";
  onSort: () => void;
  sortableIcon: (
    index: number,
    isSorted: boolean,
    sortDirection: "asc" | "desc",
  ) => JSX.Element | null;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  header,
  index,
  isSorted,
  sortDirection,
  onSort,
  sortableIcon,
}) => {
  return (
    <th
      key={index}
      className={`border-blue-gray-100 bg-blue-gray-50/50 ${sortableIcon(index, isSorted, sortDirection) ? "cursor-pointer hover:bg-blue-gray-50" : ""} border-y p-4 transition-colors`}
      onClick={onSort}
    >
      <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-blue-gray-900 antialiased opacity-70">
        {header}
        {sortableIcon(index, isSorted, sortDirection)}
      </p>
    </th>
  );
};

export default SortableHeader;
