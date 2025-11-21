import React from "react";

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <article
      className="task-card"
      style={{
        padding: "18px",
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginBottom: 16,
      }}
    >
      {/* Top Content */}
      <div style={{ marginBottom: 12 }}>
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
            textDecoration: task.completed ? "line-through" : "none",
            opacity: task.completed ? 0.6 : 1,
            transition: "0.2s ease",
          }}
        >
          {task.title}
        </h3>

        <p
          style={{
            margin: "6px 0 0",
            opacity: task.completed ? 0.5 : 0.7,
            textDecoration: task.completed ? "line-through" : "none",
            transition: "0.2s ease",
          }}
        >
          {task.description}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 14,
          alignItems: "center",
        }}
      >
        {/* LEFT: Delete + Edit */}
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-danger" onClick={() => onDelete(task)}>
            Delete
          </button>

          <button className="btn-ghost" onClick={() => onEdit(task)}>
            Edit
          </button>
        </div>

        {/* RIGHT: Complete Button (NO POPUP) */}
        <button
          className="btn-primary"
          onClick={() => onToggle(task)}   // ⬅ Instant toggle
          style={{
            backgroundColor: task.completed ? "#2563eb" : "",
            padding: "6px 18px",
          }}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
      </div>
    </article>
  );
}
