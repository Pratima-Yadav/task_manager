import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/tasks"
        element={currentUser ? <TaskPage /> : <Navigate to="/auth" />}
      />
      <Route path="*" element={<Navigate to={currentUser ? "/tasks" : "/auth"} />} />
    </Routes>
  );
};

export default App;