import { useState } from "react";
import { Plus, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

const Navbar = ({
  onAddTask,
  activeNav,
  setActiveNav,
  setFilter,
  search,
  setSearch,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { id: "all", label: "All tasks" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Done" },
  ];

  return (
    <>
      <nav className="bg-white border-b border-[#E8EAED] sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Brand */}
          <div className="text-lg font-extrabold text-[#111827] tracking-tight shrink-0">
            done<span className="text-[#059669]">.</span>
          </div>
          <div className="flex md:hidden flex-6 items-center gap-2 bg-[#F4F6F9] border border-[#E8EAED] rounded-lg px-3 py-2">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
            />
          </div>
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-1 shrink-0">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveNav(id);
                  setFilter(id === "all" ? "all" : id);
                }}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition ${
                  activeNav === id
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : "text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F4F6F9]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search — */}
          <div className="hidden md:flex items-center gap-2 bg-[#F4F6F9] border border-[#E8EAED] rounded-lg px-3 py-2 w-72 ">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none bg-transparent"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onAddTask}
              className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:block">New task</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#ECFDF5] border-2 border-[#A7F3D0] flex items-center justify-center text-xs font-bold text-[#059669]">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => setLogoutConfirm(true)}
              className="p-2 text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <ConfirmModal
        isOpen={logoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign out"
        message="Are you sure you want to sign out of your account?"
        confirmLabel="Sign out"
        type="warning"
      />
    </>
  );
};

export default Navbar;
