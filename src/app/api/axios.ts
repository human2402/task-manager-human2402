// src/app/api/axios.ts
import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'production'
    ? 'https://t1-task-manager-server-e42e.onrender.com/tasks'
    : 'http://localhost:3001/tasks';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
