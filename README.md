
# Менеджер задач

Task Manager

---

[Task Manager](https://dmitrym-task-manager.vercel.app/)

Домашнее задание от ИТ-Лагеря T1
Выполнил: Малежик Дмитрий
Telegram: @human2402

[Backend (repo)](https://github.com/human2402/t1-task-manager-server)

---

## Функционал

   - CRUD-операции для задач (создание, просмотр, редактирование, удаление)

   - Сортировка задач по дате создания и приоритету

   - Фильтрация задач по статусу, категории и приоритету

   - Адаптивный UI под мобильные и десктопные устройства

   - Реализация маршрутов /, /task/new, /task/:id

   - Управление состоянием с помощью Redux Toolkit

   - Работа с backend (restAPI)

   - Архитектура проекта по подходу Feature-Sliced Design

---

## Технологии

    React 18 + TypeScript

    Redux Toolkit + @reduxjs/toolkit

    React Router v6

    Material UI v5

    Vite — быстрая сборка и разработка

    AXIOS

---

## Установка и запуск

   ```bash
   git clone https://github.com/human2402/task-manager-human2402.git
   cd task-manager-human2402
   npm install
   npm run dev

---

## Структура проекта (Feature-Sliced Design)
   ```bash
   src/
   ├── app/               # Инициализация приложения (store, providers, api)
   ├── entities/          # Основные сущности (например, task)
   │   └── task/
   │       ├── model/     # Типы, slice, контексты (если есть)
   │       └── ui/        # Компоненты одной задачи (TaskItem и др.)
   ├── features/          # Бизнес-фичи (Create, Edit, Filter, Sort и др.)
   ├── widgets/           # Составные блоки интерфейса (TaskList, LoadingStatus)
   ├── pages/             # Страницы приложения (Home, TaskCreatePage и т.д.)
   ├── routes/            # Конфигурация роутов

