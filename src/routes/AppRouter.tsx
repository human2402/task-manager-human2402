import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import TaskEditPage from "../pages/TaskEditPage.tsx";
import TaskCreatePage from "@/pages/TaskCreatePage.tsx";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/task/:id" element={<TaskEditPage />} />
    <Route path="/task/new" element={<TaskCreatePage />} />
  </Routes>
);

export default AppRouter;
