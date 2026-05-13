interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 0) return null;

  if (totalPages === 1) {
    return (
      <div className="flex justify-center items-center space-x-1">
        <button className="px-3 py-2 rounded-md text-sm font-medium bg-primary-orange text-white">
          1
        </button>
      </div>
    );
  }

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      const pages = [];
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 2) {
      return [2, 3];
    } else if (currentPage >= totalPages - 2) {
      return [totalPages - 2, totalPages - 1];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };
  const showLeftEllipsis = currentPage > 3 && totalPages > 4;
  const showRightEllipsis = currentPage < totalPages - 2 && totalPages > 4;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-1">
      {/* First page */}
      <button
        onClick={() => onPageChange(1)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 1
            ? "bg-primary-orange text-white"
            : "bg-white text-gray-700 hover:bg-blue-50 hover:text-primary-orange border border-gray-300"
        }`}
      >
        1
      </button>

      {showLeftEllipsis && <span className="px-2 text-gray-500">...</span>}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary-orange text-white"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-primary-orange border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {showRightEllipsis && <span className="px-2 text-gray-500">...</span>}

      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "bg-primary-orange text-white"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-primary-orange border border-gray-300"
          }`}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
