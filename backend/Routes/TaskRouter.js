const { createTask, fetchAllTask, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');

const router = require('express').Router();

//To get all the task
router.get('/', fetchAllTask)

// To create a task 
router.post('/', createTask);

// To update task
router.put('/:id', updateTaskById);

// To delete task
router.delete('/:id', deleteTaskById);


module.exports = router;