import {
    Box,
    Button,
    Container,
    MenuItem,
    TextField,
    Typography,
    Stack,
  } from "@mui/material";
  import { useParams, useNavigate } from "react-router-dom";
  import { useTasks } from "./TaskContext";
  import type { TaskCategory, TaskPriority, TaskStatus } from "./types";
  import { useState } from "react";
import { toast } from "react-toastify";
  
  export default function TaskDetails() {
    const { id } = useParams();
    const { tasks, updateTask } = useTasks();
    const navigate = useNavigate();
  
    const task = tasks.find((t) => t.id === id);
    const [title, setTitle] = useState(task?.title ?? "");
    const [description, setDescription] = useState(task?.description ?? "");
    const [category, setCategory] = useState<TaskCategory>(task?.category ?? "Feature");
    const [status, setStatus] = useState<TaskStatus>(task?.status ?? "To Do");
    const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "Medium");
  
    if (!task) {
      return <Typography>Задача не найдена</Typography>;
    }
  
    const handleSave = () => {
      updateTask({
        ...task,
        title,
        description,
        category,
        status,
        priority,
      });
      toast.info("Задача сохранена");
      navigate("/");
    };
  
    const handleCancel = () => {
      navigate("/");
    };
  
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Редактирование задачи
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            select
            label="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            fullWidth
          >
            <MenuItem value="Bug">Ошибка</MenuItem>
            <MenuItem value="Feature">Функция</MenuItem>
            <MenuItem value="Documentation">Документация</MenuItem>
            <MenuItem value="Refactor">Рефакторинг</MenuItem>
            <MenuItem value="Test">Тест</MenuItem>
          </TextField>
  
          <TextField
            select
            label="Статус"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            fullWidth
          >
            <MenuItem value="To Do">К выполнению</MenuItem>
            <MenuItem value="In Progress">В процессе</MenuItem>
            <MenuItem value="Done">Сделано</MenuItem>
          </TextField>
  
          <TextField
            select
            label="Приоритет"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            fullWidth
          >
            <MenuItem value="Low">Низкий</MenuItem>
            <MenuItem value="Medium">Средний</MenuItem>
            <MenuItem value="High">Высокий</MenuItem>
          </TextField>
  
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Сохранить
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Отмена
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  }
  