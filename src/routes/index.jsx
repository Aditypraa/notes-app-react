import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ArchivedPage from "../pages/ArchivedPage";
import CreateNotePage from "../pages/CreateNotePage";
import DetailNote from "../pages/DetailNote";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes - Nested under ProtectedRoute */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="archived" element={<ArchivedPage />} />
        <Route path="create" element={<CreateNotePage />} />
        <Route path="notes/:id" element={<DetailNote />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
