import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  type = "danger",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-[#E8EAED] overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                type === "danger" ? "bg-red-50" : "bg-amber-50"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${
                  type === "danger" ? "text-red-500" : "text-amber-500"
                }`}
              />
            </div>

            <h3 className="text-base font-bold text-[#111827]">{title}</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#E8EAED] hover:bg-[#F4F6F9] flex items-center justify-center text-[#9CA3AF] hover:text-[#374151] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-sm text-[#9CA3AF] leading-relaxed">{message}</p>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-[#6B7280] border border-[#E8EAED] rounded-xl hover:bg-[#F4F6F9] transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition ${
              type === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
