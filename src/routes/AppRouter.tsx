import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import TaskPage from "../pages/TaskPage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/task/:id" element={<TaskPage />} />
  </Routes>
);

export default AppRouter;
