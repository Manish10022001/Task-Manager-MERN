import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E8EAED] bg-white text-[#9CA3AF] hover:border-[#059669] hover:text-[#059669] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition ${
            p === page
              ? "bg-[#059669] border-[#059669] text-white"
              : "bg-white border-[#E8EAED] text-[#6B7280] hover:border-[#059669] hover:text-[#059669]"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E8EAED] bg-white text-[#9CA3AF] hover:border-[#059669] hover:text-[#059669] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
