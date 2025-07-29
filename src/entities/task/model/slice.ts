import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/axios';
import type { Task } from './types'; 

// Async thunks

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get<Task[]>('/');
  console.log(response.data)
  return response.data;
});

export const updateTask = createAsyncThunk<Task, Task>(
  'tasks/updateTask',
  async (task) => {
    const response = await api.patch(`http://localhost:3001/tasks/${task.id}`, task);
    return response.data;
  }
);
export const createTask = createAsyncThunk<Task, Omit<Task, 'id'>>(
  'tasks/createTask',
  async (taskData) => {
    const response = await api.post('http://localhost:3001/tasks', taskData);
    return response.data;
  }
);
export const deleteTask = createAsyncThunk<string, string>(
  'tasks/deleteTask',
  async (taskid) => {
    await api.delete(`http://localhost:3001/tasks/${taskid}`);
    return taskid; 
  }
);

// Initial states
export interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};



const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder

      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка при загрузке задач';
      })

      // UPDATE TASK
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const updated = action.payload;
        const index = state.tasks.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          state.tasks[index] = updated;
        }
      })

      // CREATE TASK
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })

      // DELETE TASK
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
