import { Check, Pencil, Trash2, RotateCcw } from "lucide-react";

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const isDone = task.status === "completed";

  return (
    <div
      className={`bg-white border rounded-xl px-5 py-4 flex items-start gap-4 shadow-sm transition hover:shadow-md ${
        isDone
          ? "border-[#E8EAED] opacity-75"
          : "border-[#E8EAED] hover:border-[#A7F3D0]"
      }`}
    >
      {/* Checkbox toggle */}
      <button
        onClick={() => onToggle(task)}
        title={isDone ? "Mark as pending" : "Mark as completed"}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
          isDone
            ? "bg-[#059669] border-[#059669] hover:bg-[#047857]"
            : "border-[#D1D5DB] hover:border-[#059669]"
        }`}
      >
        {isDone && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-snug ${
            isDone ? "line-through text-[#D1D5DB]" : "text-[#111827]"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Toggle button — always visible, clear label */}
        <button
          onClick={() => onToggle(task)}
          className={`mt-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition ${
            isDone
              ? "bg-[#F4F6F9] border-[#E8EAED] text-[#9CA3AF] hover:border-[#D97706] hover:text-[#D97706]"
              : "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669] hover:bg-[#D1FAE5]"
          }`}
        >
          {isDone ? (
            <>
              <RotateCcw className="w-3 h-3" /> Mark as pending
            </>
          ) : (
            <>
              <Check className="w-3 h-3" /> Mark as complete
            </>
          )}
        </button>
      </div>

      {/* Badge */}
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 border ${
          isDone
            ? "bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]"
            : "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
        }`}
      >
        {isDone ? "Done" : "Pending"}
      </span>

      {/* Actions — always visible */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(task)}
          title="Edit task"
          className="w-8 h-8 rounded-lg border border-[#E8EAED] hover:border-[#A7F3D0] hover:text-[#059669] flex items-center justify-center text-[#9CA3AF] transition"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          title="Delete task"
          className="w-8 h-8 rounded-lg border border-[#E8EAED] hover:border-red-200 hover:text-red-500 flex items-center justify-center text-[#9CA3AF] transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
