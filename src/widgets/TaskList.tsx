import { Grid, Typography, Box, Button } from "@mui/material";
import TaskItem from "../entities/task/ui/TaskItem";
import { useEffect, useState } from "react";
import TaskFilters from "../features/taskFilters/TaskFilters";
import TaskSort from "@features/taskSort/TaskSort";
import type { TaskCategory, TaskStatus, TaskPriority } from "../entities/task/model/types";


import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { fetchTasks } from "@/entities/task/model/slice";
import { useNavigate } from "react-router-dom";
import LoadingStatus from "./LoadingStatus";

const statuses: { key: TaskStatus; label: string }[] = [
  { key: "To Do", label: "К выполнению" },
  { key: "In Progress", label: "В процессе" },
  { key: "Done", label: "Сделано" },
];

const priorityOrder: Record<TaskPriority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
};


export default function TaskList() {
  
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const status = useSelector((state: RootState) => state.task.status);
  const nav = useNavigate ()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTasks());
  }, [status, dispatch]);
  

  // Фильтры
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "">("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "">("");
  const [sortOption, setSortOption] = useState<"createdAt" | "priority" | "">("");

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    return (
      (categoryFilter === "" || task.category === categoryFilter) &&
      (statusFilter === "" || task.status === statusFilter) &&
      (priorityFilter === "" || task.priority === priorityFilter)
    );
  });

  // Сортировка
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "createdAt") {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    }
  
    if (sortOption === "priority") {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  
    return 0;
  });
  

  // Расспределение задач по колонкам
  const tasksByStatus = statuses.map(({ key, label }) => ({
    key,
    label,
    tasks: sortedTasks.filter((task) => task.status === key),
  }));

  // Проверка на наличие задач
  const allEmpty = tasksByStatus.every((col) => col.tasks.length === 0);


  const clearFilters = () => {
    setCategoryFilter("");
    setStatusFilter("");
    setPriorityFilter("");
    setSortOption("");
  };

  return (
    <>
      <Box mb={2}>
        <TaskFilters
          category={categoryFilter}
          status={statusFilter}
          priority={priorityFilter}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onClear={clearFilters}
        />
      </Box>
      
      
      <Box 
        mb={2} display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
      >
        <TaskSort sortOption = {sortOption} setSortOption = {setSortOption} />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => nav('/task/new')}
        >
            + Новая задача
        </Button>
      </Box>

      { status!=='succeeded' ? 
      <LoadingStatus status={status}/> : 
      allEmpty ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary">
            Нет задач по выбранным фильтрам
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {tasksByStatus.map(({ key, label, tasks }) =>
            tasks.length > 0 ? (
              <Grid size = {{ xs:12, sm:6, md:4 }} key={key} gap={2}>
                <Typography variant="h6" gutterBottom>
                  {label}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2} >
                  {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </Box>
              </Grid>
            ) : null
          )}
        </Grid>
      )}
      
    </>
  );
}


