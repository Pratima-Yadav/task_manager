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
            - AuthPage.js (Contains UI for login and register flow)
            - TaskPage.js (Contains UI for the task dashboard for managing tasks)

        - redux
            - slices 
                - userSlice.js ( contains slice for managing users such as managing currrent users and getting user info )
                - taskSlice.js ( contains slice for managing tasks such as adding , loading , deleting , completing etc. )
            - store.js ( contains redux store files )
        
        - App.js (For Routes handling)
        



