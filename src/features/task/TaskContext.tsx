import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "./types";
import { v4 as uuidv4 } from "uuid";

// Фейковые задания
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Исправить ошибку входа",
    description: "Пользователь не может войти через Safari.",
    category: "Bug",
    status: "To Do",
    priority: "High",
  },
  {
    id: uuidv4(),
    title: "Добавить фильтры задач",
    description: "Позволить фильтровать по статусу, категории и приоритету.",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: uuidv4(),
    title: "Оптимизировать загрузку страницы",
    description: "Уменьшить время загрузки главной страницы.",
    category: "Refactor",
    status: "To Do",
    priority: "High",
  },
  {
    id: uuidv4(),
    title: "Обновить документацию API",
    description: "Добавить описание новых эндпоинтов.",
    category: "Documentation",
    status: "Done",
    priority: "Low",
  },
  {
    id: uuidv4(),
    title: "Реализовать темную тему",
    description: "Добавить поддержку темной темы для интерфейса.",
    category: "Feature",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: uuidv4(),
    title: "Исправить ошибку отображения в IE11",
    description: "Некорректное отображение кнопок в Internet Explorer 11.",
    category: "Bug",
    status: "In Progress",
    priority: "High",
  },
  {
    id: uuidv4(),
    title: "Добавить уведомления о новых задачах",
    description: "Реализовать push-уведомления для новых задач.",
    category: "Feature",
    status: "To Do",
    priority: "Medium",
  },
];


type TaskContextType = {
  tasks: Task[];
  updateTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks вне TaskProvider");
  return context;
};
