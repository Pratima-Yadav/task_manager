// redux/slices/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getTasksForUser = (username) => {
    return JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
};

const saveTasksForUser = (username, tasks) => {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

const initialState = {
    tasks: getTasksForUser(localStorage.getItem('currentUser')),
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        loadTasksForUser: (state, action) => {
            state.tasks = getTasksForUser(action.payload);
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            saveTasksForUser(localStorage.getItem('currentUser'), state.tasks);
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) task.completed = !task.completed;
            saveTasksForUser(localStorage.getItem('currentUser'), state.tasks);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload);
            saveTasksForUser(localStorage.getItem('currentUser'), state.tasks);
        },
        editTask: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload.id);
            if (task) task.title = action.payload.title;
            saveTasksForUser(localStorage.getItem('currentUser'), state.tasks);
        },
    },
});

export const {
    loadTasksForUser,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
} = taskSlice.actions;
export default taskSlice.reducer;
