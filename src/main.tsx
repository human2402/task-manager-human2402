import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from '@entities/task/model/TaskContext';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './app/AppProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <TaskProvider>
        <App />
        <ToastContainer />
      </TaskProvider>
    </AppProvider>
  </React.StrictMode>,
);
