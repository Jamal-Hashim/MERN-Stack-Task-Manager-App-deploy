const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: "Task is Created", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to Create Task", success: false });
    }
}

const fetchAllTask = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json({ message: "All Tasks Fetched", success: true, data });
    } catch (err) {
        res.status(500).json({ message: "Failed to Fetch All Tasks", success: false });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskModel.findByIdAndUpdate(id, obj)
        res.status(200).json({ message: "Tasks is Updated", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to Update Tasks", success: false });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findOneAndDelete(id);
        res.status(200).json({ message: "Tasks is Deleted", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to Delete Tasks", success: false });
    }
}

module.exports = {
    createTask,
    fetchAllTask,
    updateTaskById,
    deleteTaskById
}