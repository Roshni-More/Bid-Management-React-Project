// import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  // If total pages are small, show all pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    // Show dots after first page
    if (currentPage > 4) {
      pages.push("...");
    }

    // Pages around current page
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show dots before last page
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);
  }

  return (
    <ul className="pagination mb-0">
      {/* Previous */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          ‹
        </button>
      </li>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <li key={`dots-${index}`} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        ) : (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ),
      )}

      {/* Next */}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        >
          ›
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
