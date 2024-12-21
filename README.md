# Task Manager App

## Description
This is a Task Manager application built using React. It allows users to register, log in, and manage tasks by adding, editing, deleting, and marking tasks as completed.

## Deployed URL
[https://taskmanager0402.netlify.app](https://taskmanager0402.netlify.app)


## Repository URL
[https://github.com/Pratima-Yadav/task_manager](https://github.com/Pratima-Yadav/task_manager)


---
## How to use app

- First click register and register your username and password, once user is registered
- then proceed to login with the new credentials
- then add a task , which you can also add , edit and delete and also mark as completed



## After cloning
Run the project locally using following commands

- npm i
- npm start


## Repository Architecture
Project architecture is as follows

- src
    - pages
        - **AuthPage.js**: Handles the login and registration flows.
        - **TaskPage.js**: Provides the task dashboard for managing tasks.

    - redux
        - **slices**: 
            - **userSlice.js**: Manages user-related functionality such as managing the current user and retrieving user information.
            - **taskSlice.js**: Handles task-related actions like adding, loading, deleting, and marking tasks as completed.
        - **store.js**: Configures the Redux store.

    - **App.js**: Responsible for routing setup and managing application navigation.

