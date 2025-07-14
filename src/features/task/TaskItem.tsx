import { Card, CardContent, Typography, Chip, Button, CardActions, Box } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import type { Task } from "./types";
import { useNavigate } from "react-router-dom";



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
          <Chip label={`Категория: ${categoryLabels[task.category]}`} color="default" />
          <Chip label={`Статус: ${statusLabels[task.status]}`} color="default" />
          <Chip
            label={`Приоритет: ${priorityLabels[task.priority]}`}
            sx={{
              bgcolor: task.priority === "High" ? "#f8d7da" : undefined,  
              color: task.priority === "High" ? "#842029" : undefined,
            }}
          />
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
      </CardActions>
    </Card>
  );
}
