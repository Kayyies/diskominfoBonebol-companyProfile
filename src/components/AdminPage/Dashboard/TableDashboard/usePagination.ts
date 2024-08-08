// usePagination.ts
import { useState, useMemo } from "react";
import { DataItem } from "./types";

const usePagination = (data: DataItem[], rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    );
  }, [data, currentPage, rowsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleGoToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    handleNextPage,
    handlePreviousPage,
    handleGoToPage,
    setCurrentPage,
  };
};

export default usePagination;
