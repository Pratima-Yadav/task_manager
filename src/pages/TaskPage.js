import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { addTask, toggleTask, deleteTask, editTask, loadTasksForUser } from '../redux/slices/taskSlice';

const TaskPage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const [editTitle, setEditTitle] = useState('');

    const [filter, setFilter] = useState('all');
    const [errors, setErrors] = useState({ taskTitle: '', editTitle: '' });

    useEffect(() => {
        if (currentUser) {
            dispatch(loadTasksForUser(currentUser));

        }
    }, [currentUser, dispatch]);

    const validateTaskTitle = (title) => {
        if (!title.trim()) {
            return 'Task title is required.';
        } else if (title.trim().length < 3) {
            return 'Task title must be at least 3 characters long.';
        }
        return '';
    };

    const handleAddTask = () => {
        const error = validateTaskTitle(taskTitle);
        if (error) {
            setErrors((prev) => ({ ...prev, taskTitle: error }));
            return;
        }
        dispatch(addTask({ id: Date.now(), title: taskTitle, completed: false }));
        setTaskTitle('');

        setErrors((prev) => ({ ...prev, taskTitle: '' }));

    };

    const handleEditTask = (task) => {
        setEditingTask(task.id);
        setEditTitle(task.title);
    };


    const saveEditTask = () => {
        const error = validateTaskTitle(editTitle);
        if (error) {
            setErrors((prev) => ({ ...prev, editTitle: error }));
            return;
        }


        dispatch(editTask({ id: editingTask, title: editTitle }));
        setEditingTask(null);
        setEditTitle('');
        setErrors((prev) => ({ ...prev, editTitle: '' }));

    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;

        return true;
    });

    return (
        <div className="h-screen flex flex-col bg-gray-100">

            <header className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Task Management</h1>
                <div className="flex gap-6 items-center">
                    <div
                        className="h-8 w-8 border-2 border-white rounded-full flex items-center justify-center text-sm font-semibold"
                        title={currentUser}
                    >

                        {currentUser ? currentUser.charAt(0).toUpperCase() : ''}
                    </div>
                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                    >

                        Logout
                    </button>
                </div>
            </header>



            <div className="flex-grow flex flex-col items-center p-6">
                <div className="w-full max-w-4xl mb-6">
                    <div className="flex flex-col">
                        <div className="flex">
                            <input
                                className={`flex-grow p-4 border rounded-l focus:outline-none focus:ring focus:ring-indigo-400 ${errors.taskTitle ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="New Task"
                                value={taskTitle}
                                onChange={(e) => {
                                    setTaskTitle(e.target.value);
                                    setErrors((prev) => ({ ...prev, taskTitle: '' }));
                                }}
                            />
                            <button
                                onClick={handleAddTask}
                                className="bg-indigo-600 text-white px-6 py-4 rounded-r hover:bg-indigo-700"
                            >
                                Add Task
                            </button>
                        </div>
                        {errors.taskTitle && <p className="text-red-500 text-sm mt-1">{errors.taskTitle}</p>}
                    </div>
                </div>

                {tasks.length > 0 && <div className="w-full max-w-4xl mb-6 flex justify-between">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    >
                        All Tasks
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    >
                        Completed Tasks
                    </button>
                    <button
                        onClick={() => setFilter('incomplete')}
                        className={`px-4 py-2 rounded ${filter === 'incomplete' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    >
                        Incomplete Tasks
                    </button>

                </div>}

                <ul className="w-full max-w-4xl space-y-4">
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className={`p-4 flex justify-between items-center bg-white rounded-md shadow-md transform transition-all hover:scale-105 ${task.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {editingTask === task.id ? (
                                <div className="flex-grow">
                                    <input
                                        className={`w-full p-2 border rounded ${errors.editTitle ? 'border-red-500' : ''}`}
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => {
                                            setEditTitle(e.target.value);
                                            setErrors((prev) => ({ ...prev, editTitle: '' }));
                                        }}
                                    />
                                    {errors.editTitle && <p className="text-red-500 text-sm mt-1">{errors.editTitle}</p>}
                                </div>
                            ) : (
                                <span>{task.title}</span>
                            )}
                            <div className="flex items-center space-x-4">
                                {editingTask === task.id ? (
                                    <button
                                        onClick={saveEditTask}
                                        className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => dispatch(toggleTask(task.id))}
                                    className={`${task.completed ? 'bg-blue-500' : 'bg-gray-500'} px-3 py-1 rounded text-white hover:bg-blue-600`}
                                >
                                    {task.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTask(task.id))}
                                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskPage;
