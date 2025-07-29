import { Card, CardContent, Typography, Chip, Button, CardActions, Box, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import type { Task } from "../model/types";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { deleteTask } from "../model/slice";
import { toast } from "react-toastify";


type Props = {
  task: Task;
};

const categoryLabels: Record<Task["category"], string> = {
  Bug: "Ошибка",
  Feature: "Функция",
  Documentation: "Документация",
  Refactor: "Рефакторинг",
  Test: "Тест",
};

const statusLabels: Record<Task["status"], string> = {
  "To Do": "К выполнению",
  "In Progress": "В процессе",
  "Done": "Сделано",
};

const priorityLabels: Record<Task["priority"], string> = {
  Low: "Низкий",
  Medium: "Средний",
  High: "Высокий",
};

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}


export default function TaskItem({ task }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let formattedDate = null
  if (task.createdAt) {
    const createdDate = new Date(task.createdAt);
    formattedDate = createdDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    });
  }

  const handleDelete = () => {
    if (confirm('Удалить задачу?')) {
      dispatch(deleteTask(task.id));
      toast.info("Задача удалена");
    }
  };

  return (
    <Card 
      sx={{
        minWidth: 250,
        border: "1px solid gray",
        borderRadius: "10px",
        boxShadow: "none",
        overflow: "hidden", 
        transition: "0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {truncateText(task.title, 50)}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {task.description ? truncateText(task.description, 100) : ""}
          </Typography>
        )}
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          <Chip 
            label={`Категория: ${categoryLabels[task.category]}`} 
            sx={{
              bgcolor: task.category === "Bug" ? "#f8d7da" : undefined,  
              color: task.category === "Bug" ? "#842029" : undefined,
            }}
          />
          <Chip
            label={`Приоритет: ${priorityLabels[task.priority]}`}
            sx={{
              bgcolor: task.priority === "High" ? "#f8d7da" : undefined,  
              color: task.priority === "High" ? "#842029" : undefined,
            }}
          />
          <Chip label={`Статус: ${statusLabels[task.status]}`} color="default" />
          {
            formattedDate?
            <Chip label={`Создан: ${formattedDate}`}/>:
            null
          }
          
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          Редактировать
        </Button>
        <IconButton onClick={handleDelete} sx={{ color: 'gray' }}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
