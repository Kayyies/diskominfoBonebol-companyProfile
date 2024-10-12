import React from "react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1, // Jumlah halaman di kiri/kanan halaman aktif
    pageSize,
}) => {
    // Fungsi untuk membuat array angka halaman
    const createPageRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
    };

    const firstPage = 1;
    const lastPage = totalPages;

    const paginationRange = () => {
        const totalPageNumbers = siblingCount * 2 + 5; // Total tombol halaman ditambah first, last, prev, next
        if (totalPages <= totalPageNumbers) {
            return createPageRange(1, totalPages); // Jika total halaman lebih kecil, tampilkan semuanya
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

        const showLeftDots = leftSiblingIndex > firstPage + 2;
        const showRightDots = rightSiblingIndex < lastPage - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!showLeftDots && showRightDots) {
            const leftItemCount = siblingCount * 2 + 3;
            const leftRange = createPageRange(1, leftItemCount);

            return [...leftRange, "...", totalPages];
        } else if (showLeftDots && !showRightDots) {
            const rightItemCount = siblingCount * 2 + 3;
            const rightRange = createPageRange(totalPages - rightItemCount + 1, totalPages);

            return [firstPageIndex, "...", ...rightRange];
        } else if (showLeftDots && showRightDots) {
            const middleRange = createPageRange(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }
    };

    const handleFirstPage = () => {
        onPageChange(1);
    };

    const handleLastPage = () => {
        onPageChange(totalPages);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const pages = paginationRange();

    return (
        <div className="flex flex-wrap gap-1">
            <button
                className="btn btn-sm rounded"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
            >
                &#10092;&#10092;
            </button>

            <button
                className="btn btn-sm rounded"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                &#10092;
            </button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <button key={index} className="" disabled>
                        ...
                    </button>
                ) : (
                    <button
                        key={index}
                        className={`btn btn-sm rounded ${currentPage === page ? "btn-active" : ""
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className="btn btn-sm rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                &#10093;
            </button>

            <button
                className="btn btn-sm rounded"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
            >
                &#10093;&#10093;
            </button>
        </div>
    );
};

export default Pagination;
