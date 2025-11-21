import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ConfirmModal from "../components/ConfirmModal";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // -------------------------------
  // FETCH TASKS
  // -------------------------------
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/my-tasks",
          { withCredentials: true }
        );
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log("Error loading tasks:", err.message);
      }
    };

    loadTasks();
  }, []);

  // -------------------------------
  // SAVE TASK (CREATE / UPDATE)
  // -------------------------------
  const handleSave = (task) => {
    if (!task || !task._id) return;

    setTasks(prev =>
      prev.some(t => t._id === task._id)
        ? prev.map(t => (t._id === task._id ? task : t))
        : [task, ...prev]
    );

    setEditing(null);
    setShowForm(false);
  };

  // -------------------------------
  // COMPLETE TASK (NO CONFIRMATION)
  // -------------------------------
  const handleToggle = async (task) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/complete/${task._id}`,
        {},
        { withCredentials: true }
      );

      handleSave(res.data.updatedTask);

    } catch (err) {
      console.log("Complete error:", err.message);
    }
  };

  // -------------------------------
  // DELETE (WITH CONFIRM MODAL)
  // -------------------------------
  const handleDelete = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/${taskToDelete._id}`,
        { withCredentials: true }
      );

      setTasks(prev => prev.filter(t => t._id !== taskToDelete._id));

    } catch (err) {
      console.log("Delete error:", err.message);
    }

    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  // COUNTS
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <section>
      <Hero active={activeCount} completed={completedCount} />

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Task?"
        message="Are you sure you want to delete this task permanently?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tasks</h2>

          {!showForm && (
            <button
              className="btn-primary"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
            >
              + New Task
            </button>
          )}
        </div>

        {showForm && (
          <TaskForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        )}

        {/* TASK LIST */}
        <div className="tasks-grid" style={{ marginTop: 12 }}>
          {tasks.map(t => (
            <TaskCard
              key={t._id}
              task={t}
              onEdit={(task) => {
                setEditing(task);
                setShowForm(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
              onToggle={handleToggle}  // ✔ instant complete
            />
          ))}
        </div>
      </div>
    </section>
  );
}
