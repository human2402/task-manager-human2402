import { Grid, Typography, Box } from "@mui/material";
import TaskItem from "./TaskItem";
import { useTasks } from "./TaskContext";
import { useState } from "react";
import TaskFilters from "./TaskFilters";
import type { TaskCategory, TaskStatus, TaskPriority } from "./types";

const statuses: { key: TaskStatus; label: string }[] = [
  { key: "To Do", label: "К выполнению" },
  { key: "In Progress", label: "В процессе" },
  { key: "Done", label: "Сделано" },
];

export default function TaskList() {
  const { tasks } = useTasks();

  // Фильтры
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "">("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "">("");

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    return (
      (categoryFilter === "" || task.category === categoryFilter) &&
      (statusFilter === "" || task.status === statusFilter) &&
      (priorityFilter === "" || task.priority === priorityFilter)
    );
  });

  // Расспределение задач по колонкам
  const tasksByStatus = statuses.map(({ key, label }) => ({
    key,
    label,
    tasks: filteredTasks.filter((task) => task.status === key),
  }));

  // Проверка на наличие задач
  const allEmpty = tasksByStatus.every((col) => col.tasks.length === 0);


  const clearFilters = () => {
    setCategoryFilter("");
    setStatusFilter("");
    setPriorityFilter("");
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

      {allEmpty ? (
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


