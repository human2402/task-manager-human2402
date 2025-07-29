import {
    Box,
    Button,
    Container,
    MenuItem,
    TextField,
    Typography,
    Stack,
  } from "@mui/material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import { useDispatch } from "react-redux";
  
  import type { TaskCategory, TaskPriority, TaskStatus } from "@entities/task/model/types";
  import { createTask } from "@entities/task/model/slice";
  import type { AppDispatch } from "@/app/store";
  
  export default function TaskCreate() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TaskCategory>("Feature");
    const [status, setStatus] = useState<TaskStatus>("To Do");
    const [priority, setPriority] = useState<TaskPriority>("Medium");

    const [titleError, setTitleError] = useState(false); 
    const [descError, setDescError] = useState(false);
  
    const handleCreate = async () => {
      // Validation
      if (!title.trim()) {
        setTitleError(true);
        toast.error("Заголовок обязателен");
        return;
      }
      if (!description.trim()) {
        setDescError(true);
        toast.error("Описание обязателено");
        return;
      }
      // Dispatching s
  
      try {
        await dispatch(
          createTask({ title, description, category, status, priority, createdAt: new Date().toISOString() })
        ).unwrap();
        toast.success("Задача создана");
        navigate("/");
      } catch (err) {
        toast.error("Ошибка при создании задачи");
      }
    };
  
    const handleCancel = () => {
      navigate("/");
    };
  
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Новая задача
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Заголовок"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setTitleError(false);
              }
            }}
            error={titleError}
            fullWidth
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value.trim()) {
                setDescError(false);
              }
            }}
            error={descError}
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
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Создать
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Отмена
            </Button>
          </Box>
        </Stack>
      </Container>
    );
  }
  