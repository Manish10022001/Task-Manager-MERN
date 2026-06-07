import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (form) => {
    try {
      const { data } = await api.post("/tasks/create", form);
      setTasks((prev) => [data, ...prev]);
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        msg: e.response?.data?.message || "Failed to create task",
      };
    }
  };

  const updateTask = async (id, form) => {
    try {
      const { data } = await api.put(`/tasks/update/${id}`, form);
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        msg: e.response?.data?.message || "Failed to update task",
      };
    }
  };

  const toggleTask = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      const { data } = await api.patch(`/tasks/update/${task._id}`, {
        status: newStatus,
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data : t)));
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, msg: "Failed to update status" };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/delete/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false, msg: "Failed to delete task" };
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
