import { Route, Routes } from "react-router";

import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />

        <Route path="projects" element={<ProjectsPage />} />

        <Route path="tasks" element={<TasksPage />} />

        <Route path="team" element={<TeamPage />} />
      </Route>
    </Routes>
  );
}

export default App;
