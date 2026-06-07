import { SlidersHorizontal } from "lucide-react";

const FilterBar = ({
  filter,
  setFilter,
  sort,
  setSort,
  total,
  pending,
  completed,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
      {/* Status filter chips */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: "All", value: "all", count: total },
          { label: "Pending", value: "pending", count: pending },
          { label: "Completed", value: "completed", count: completed },
        ].map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              filter === value
                ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]"
                : "bg-white border-[#E8EAED] text-[#9CA3AF] hover:border-[#059669] hover:text-[#059669]"
            }`}
          >
            {label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                filter === value
                  ? "bg-[#059669] text-white"
                  : "bg-[#E8EAED] text-[#9CA3AF]"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#9CA3AF]" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs font-semibold text-[#374151] bg-white border border-[#E8EAED] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#059669] transition cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="pending">Pending first</option>
          <option value="completed">Completed first</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
