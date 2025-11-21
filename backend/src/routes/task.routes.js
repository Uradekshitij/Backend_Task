import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createTask,
  getMyTasks,
  updateTask,
  toggleComplete,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/my-tasks", authMiddleware, getMyTasks);
router.put("/:taskId", authMiddleware, updateTask);
router.patch("/complete/:taskId", authMiddleware, toggleComplete);
router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
