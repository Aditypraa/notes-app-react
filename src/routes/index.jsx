import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import DetailNote from "../pages/DetailNote";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<DetailNote />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
