import { Plus } from 'lucide-react';

const messages = {
  all: {
    emoji: null,
    heading: "You're all caught up",
    sub: "Add your first task to get started",
    showAdd: true,
  },
  pending: {
    emoji: null,
    heading: 'No pending tasks',
    sub: "Everything is done — great work!",
    showAdd: false,
  },
  completed: {
    emoji: null,
    heading: 'Nothing completed yet',
    sub: 'Complete a task and it will show up here',
    showAdd: false,
  },
};

const EmptyState = ({ filter, search, onAdd }) => {
  if (search) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E8EAED] rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#F4F6F9] border border-[#E8EAED] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <p className="text-[#374151] font-semibold text-base">No results for "{search}"</p>
        <p className="text-[#9CA3AF] text-sm mt-1">Try a different keyword</p>
      </div>
    );
  }

  const { heading, sub, showAdd } = messages[filter] || messages.all;

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-dashed border-[#E8EAED] rounded-2xl">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#ECFDF5] border-2 border-[#A7F3D0] flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="6" y="8" width="24" height="20" rx="3" stroke="#059669" strokeWidth="1.5" fill="#ECFDF5"/>
            <path d="M11 14h14M11 18h10M11 22h7" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="27" cy="27" r="7" fill="#059669"/>
            <path d="M24 27l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {showAdd && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D97706] rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>

      <p className="text-[#111827] font-bold text-lg">{heading}</p>
      <p className="text-[#9CA3AF] text-sm mt-1 mb-6 text-center max-w-xs">{sub}</p>

      {showAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold px-6 py-3 rounded-xl text-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add your first task
        </button>
      )}
    </div>
  );
};

export default EmptyState;