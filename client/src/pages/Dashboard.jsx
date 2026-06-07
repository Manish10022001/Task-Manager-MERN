import { useState } from "react";
import { X, AlertCircle, ListChecks, Clock, CheckCircle2 } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
const Dashboard = () => {
  const { user } = useAuth();

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const [activeNav, setActiveNav] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [globalError, setGlobalError] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    taskId: null,
  });
  const {
    tasks,
    loading,
    error: taskError,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasks(filter, search);
  
  const openAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };
  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (form) => {
    if (editingTask) {
      return await updateTask(editingTask._id, form);
    }
    return await createTask(form);
  };

  const confirmDelete = (id) => {
    setDeleteConfirm({ open: true, taskId: id });
  };

  const handleDelete = async () => {
    const result = await deleteTask(deleteConfirm.taskId);
    if (!result.ok) setGlobalError(result.msg);
  };

  const handleToggle = async (task) => {
    const result = await toggleTask(task);
    if (!result.ok) setGlobalError(result.msg);
  };

  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  const filtered = [...tasks].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    if (sort === "pending") return a.status === "pending" ? -1 : 1;
    if (sort === "completed") return a.status === "completed" ? -1 : 1;
    return 0;
  });

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const mobileNav = [
    { id: "all", icon: ListChecks, label: "Tasks" },
    { id: "pending", icon: Clock, label: "Pending" },
    { id: "completed", icon: CheckCircle2, label: "Done" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col pb-20 md:pb-0">
      <Navbar
        onAddTask={openAdd}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="font-serif italic text-3xl text-[#111827] leading-tight">
            {getGreeting()},{" "}
            <em className="text-[#059669]">{user?.name?.split(" ")[0]}.</em>
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {pending > 0 &&
              ` · ${pending} task${pending > 1 ? "s" : ""} pending`}
          </p>
        </div>

        {/* Global error */}
        {(globalError || taskError) && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {globalError || taskError}
            <button onClick={() => setGlobalError("")} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Total tasks",
              value: tasks.length,
              accent: "bg-[#059669]",
              color: "text-[#111827]",
            },
            {
              label: "Pending",
              value: pending,
              accent: "bg-[#D97706]",
              color: "text-[#D97706]",
            },
            {
              label: "Completed",
              value: completed,
              accent: "bg-[#2563EB]",
              color: "text-[#2563EB]",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white border border-[#E8EAED] rounded-xl p-4 shadow-sm relative overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${s.accent} rounded-l-xl`}
              />
              <div
                className={`font-serif text-4xl leading-none ${s.color} mb-1`}
              >
                {s.value}
              </div>
              <div className="text-xs text-[#9CA3AF] font-medium mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter component */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          total={tasks.length}
          pending={pending}
          completed={completed}
        />

        {/* Task list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#059669] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-[#9CA3AF]">Loading your tasks...</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState filter={filter} search={search} onAdd={openAdd} />
        ) : (
          <div className="space-y-2.5">
            {filtered.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onEdit={openEdit}
                onDelete={confirmDelete}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8EAED] z-20">
        <div className="flex justify-around items-center py-2 px-4">
          {mobileNav.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveNav(id);
                setFilter(id);
              }}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition ${
                activeNav === id ? "text-[#059669]" : "text-[#9CA3AF]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
          <button
            onClick={openAdd}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-[#9CA3AF]"
          >
            <div className="w-8 h-8 bg-[#059669] rounded-full flex items-center justify-center -mt-5 border-4 border-[#F4F6F9] shadow-lg">
              <span className="text-white text-lg font-bold leading-none">
                +
              </span>
            </div>
            <span className="text-xs font-semibold mt-0.5">Add</span>
          </button>
        </div>
      </nav>

      {/* Task modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingTask={editingTask}
      />
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, taskId: null })}
        onConfirm={handleDelete}
        title="Delete task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;
