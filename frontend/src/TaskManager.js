import { useEffect, useState } from 'react';
import { FaCheck, FaPenAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { createTask, DeleteTaskById, getAllTaks, UpdateTaskById } from './api';
import { notify } from './utils';

function TaskManager() {

    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTask, setCopyTask] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            // update api call
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdate(obj);

        } else if (updateTask === null && input) {
            // Create api call

            handleAddTask();
        }
        setInput('');
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } = await createTask(obj);
            if (success) {
                // show succes toast
                notify(message, 'success');
            } else {
                // show error toast
                notify(message, 'error');
            }
            fetchAllTasks();

        } catch (error) {
            console.error(error);
            notify("Failed to Create to Task", 'error');
        }

    }

    const fetchAllTasks = async () => {
        try {
            const { data } = await getAllTaks();
            setTasks(data);
            setCopyTask(data);

        } catch (error) {
            console.error(error);
            notify("Failed to Create to Task", 'error');
        }
    }
    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);

            if (success) {
                // show succes toast
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
                notify(message, 'success');
            } else {
                // show error toast
                notify(message, 'error');
            }

            fetchAllTasks();
        } catch (error) {
            console.error(error);
            notify("Failed to Delete Task", 'error');
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj)
            if (success) {
                // show succes toast
                notify(message, 'success');
            } else {
                // show error toast
                notify(message, 'error');
            }
            fetchAllTasks();

        } catch (error) {
            console.error(error);
            notify("Failed to Create to Task", 'error');
        }
    }

    const handleUpdate = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj)
            if (success) {
                // show succes toast
                notify(message, 'success');
            } else {
                // show error toast
                notify(message, 'error');
            }
            fetchAllTasks();

        } catch (error) {
            console.error(error);
            notify("Failed to Create to Task", 'error');
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTask];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">

                    <h1 className="mb-4 text-center">Task Manager</h1>

                    {/* Input and Search Box */}
                    <div className="row g-2 mb-4">
                        <div className="col-12 col-md-6">
                            <div className="input-group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    type="text"
                                    placeholder="Add a new Task"
                                    className="form-control"
                                />
                                <button
                                    onClick={handleTask}
                                    className="btn btn-success btn-sm"
                                    type="button"
                                >
                                    <FaPlus className="m-1" />
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaSearch />
                                </span>
                                <input
                                    onChange={handleSearch}
                                    type="text"
                                    placeholder="Search Task"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lists of items */}
                    <div className="d-flex flex-column w-100">
                        {tasks.map((item) => (
                            <div
                                key={item._id}
                                className="m-2 p-3 border bg-light rounded-3 d-flex justify-content-between align-items-center flex-wrap"
                            >
                                <span
                                    className={
                                        item.isDone ? "text-decoration-line-through" : ""
                                    }
                                >
                                    {item.taskName}
                                </span>
                                <div className="mt-2 mt-sm-0 d-flex flex-wrap">
                                    <button
                                        onClick={() => handleCheckAndUncheck(item)}
                                        className="btn btn-success btn-sm me-2 mb-2 mb-sm-0"
                                        type="button"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => setUpdateTask(item)}
                                        className="btn btn-primary btn-sm me-2 mb-2 mb-sm-0"
                                        type="button"
                                    >
                                        <FaPenAlt />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(item._id)}
                                        className="btn btn-danger btn-sm mb-2 mb-sm-0"
                                        type="button"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Toastify */}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                    />
                </div>
            </div>
        </div>

    )
}
export default TaskManager;
