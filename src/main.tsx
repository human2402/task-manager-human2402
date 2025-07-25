import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './features/task/TaskContext';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider>
      
      <App />
      <ToastContainer />
    </TaskProvider>
  </React.StrictMode>,
);
