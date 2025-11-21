import TaskModel from "../models/task.model.js";



// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      author: req.user._id
    });

    res.status(201).json({ message: "Task created!", task: newTask });
  } catch (error) {
    console.log("Create task error:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// GET TASKS OF LOGGED-IN USER
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, author: req.user._id },
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Task updated", updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// TOGGLE COMPLETE  
export const toggleComplete = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await TaskModel.findOne({ _id: taskId, author: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }


    task.completed = !task.completed;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task status changed",
      updatedTask
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    await TaskModel.findOneAndDelete({
      _id: taskId,
      author: req.user._id
    });

    res.status(200).json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
