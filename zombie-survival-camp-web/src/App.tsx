import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import ParticipantsPage from "./pages/ParticipantsPage";
import CoursesPage from "./pages/CoursesPage";
import WeaponsPage from "./pages/WeaponsPage";
import ZombieBehaviorsPage from "./pages/ZombieBehaviorsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="/participants">Participants</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/weapons">Weapons</NavLink>
        <NavLink to="/zombie-behaviors">Zombie Behaviors</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/participants" replace />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/weapons" element={<WeaponsPage />} />
        <Route path="/zombie-behaviors" element={<ZombieBehaviorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
