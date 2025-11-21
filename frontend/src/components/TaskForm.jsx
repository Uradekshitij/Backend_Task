import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function TaskForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  
  // Only used during editing
  const [completed, setCompleted] = useState(initial?.completed || false);

  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setCompleted(initial?.completed || false);
    setTouched({});
  }, [initial]);

  const errors = {};
  if (!title.trim()) errors.title = "Title is required";

  const isValid = Object.keys(errors).length === 0;

  // ----------------------------------------------------
  // CREATE OR UPDATE TASK
  // ----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 User must be logged in
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    try {
      const isEditing = Boolean(initial?._id);

      const taskData = {
        title,
        description,
        ...(isEditing && { completed }),
      };

      let response;

      // -----------------------------
      // CREATE NEW TASK
      // -----------------------------
      if (!isEditing) {
        response = await axios.post(
          "http://localhost:3000/api/create",
          taskData,
          { withCredentials: true }
        );
      }

      // -----------------------------
      // UPDATE TASK
      // -----------------------------
      else {
        response = await axios.put(
          `http://localhost:3000/api/${initial._id}`,
          taskData,
          { withCredentials: true }
        );
      }

      const savedTask =
        response.data.newTask || response.data.updatedTask || response.data.task;

      if (onSave) onSave(savedTask);

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        onCancel();
      }, 2000);

    } catch (error) {
      console.log("Task error:", error.response?.data || error);
      setShowToast(true);
    }
  };

  return (
    <>
      {/* 🔥 Toast Notification */}
      <Toast
        show={showToast}
        message={initial ? "Task updated successfully!" : "Task created successfully!"}
        onClose={() => setShowToast(false)}
      />

      <form
        className="auth-card"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>{initial ? "Edit Task" : "New Task"}</h3>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-primary" disabled={!isValid} type="submit">
              {initial ? "Update" : "Create"}
            </button>
          </div>
        </div>

        {/* TITLE */}
        <div className="form-row">
          <label>Title</label>
          <input
            className={`input ${touched.title && errors.title ? "error" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          />
          {touched.title && errors.title && (
            <div className="error-text">{errors.title}</div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="form-row">
          <label>Description</label>
          <textarea
            className="input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* COMPLETED — Only show in edit mode */}
        {initial && (
          <div className="form-row" style={{ alignItems: "center" }}>
            <label style={{ marginRight: 8 }}>Completed</label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
        )}
      </form>
    </>
  );
}
