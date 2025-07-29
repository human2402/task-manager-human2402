import { Box, FormControl, InputLabel, MenuItem, Select, Button, Stack } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import type { TaskCategory, TaskStatus, TaskPriority } from "@entities/task/model/types";
import { useState } from "react";

type Props = {
  category: TaskCategory | "";
  status: TaskStatus | "";
  priority: TaskPriority | "";
  onCategoryChange: (value: TaskCategory | "") => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onClear: () => void;
};

export default function TaskFilters({
  category,
  status,
  priority,
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}: Props) {
  const [sortOption, setSortOption] = useState<"createdAt" | "priority" | "">("");
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Категория</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="Категория"
          onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value as TaskCategory | "")}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="Bug">Ошибка</MenuItem>
          <MenuItem value="Feature">Функция</MenuItem>
          <MenuItem value="Documentation">Документация</MenuItem>
          <MenuItem value="Refactor">Рефакторинг</MenuItem>
          <MenuItem value="Test">Тест</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="status-label">Статус</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          label="Статус"
          onChange={(e: SelectChangeEvent) => onStatusChange(e.target.value as TaskStatus | "")}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="To Do">К выполнению</MenuItem>
          <MenuItem value="In Progress">В процессе</MenuItem>
          <MenuItem value="Done">Сделано</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="priority-label">Приоритет</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          label="Приоритет"
          onChange={(e: SelectChangeEvent) => onPriorityChange(e.target.value as TaskPriority | "")}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="Low">Низкий</MenuItem>
          <MenuItem value="Medium">Средний</MenuItem>
          <MenuItem value="High">Высокий</MenuItem>
        </Select>
      </FormControl>
      

      <Box display="flex" alignItems="center">
        <Button variant="outlined" color="secondary" onClick={onClear}>
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}
