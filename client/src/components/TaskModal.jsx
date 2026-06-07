import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

const TaskModal = ({ isOpen, onClose, onSubmit, editingTask }) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || "",
      });
    } else {
      setForm({ title: "", description: "" });
    }
    setError("");
  }, [editingTask, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");
    setError("");
    setLoading(true);
    const result = await onSubmit(form);
    setLoading(false);
    if (result.ok) {
      onClose();
    } else {
      setError(result.msg);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#E8EAED] overflow-hidden">
        {/* Header */}
        <div className="bg-[#FAFAFA] border-b border-[#E8EAED] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif italic text-xl text-[#111827]">
              {editingTask ? "Edit task" : "New task"}
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {editingTask
                ? "Update your task details"
                : "What do you need to get done?"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#E8EAED] hover:bg-[#F4F6F9] flex items-center justify-center text-[#9CA3AF] hover:text-[#374151] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 tracking-wide">
                Title <span className="text-[#059669]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Review pull request"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#F4F6F9] border-2 border-[#E8EAED] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:bg-white transition"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 tracking-wide">
                Description{" "}
                <span className="text-[#9CA3AF] font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Add any extra details..."
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-[#F4F6F9] border-2 border-[#E8EAED] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#059669] focus:bg-white transition resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm text-[#6B7280] border border-[#E8EAED] rounded-xl hover:bg-[#F4F6F9] transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold bg-[#059669] hover:bg-[#047857] disabled:bg-[#6EE7B7] text-white rounded-xl transition"
            >
              {loading
                ? "Saving..."
                : editingTask
                ? "Save changes →"
                : "Add task →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
