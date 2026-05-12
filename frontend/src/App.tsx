import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import CoursesPage from "./pages/CoursesPage";
import WeaponsPage from "./pages/WeaponsPage";
import ZombieBehaviorsPage from "./pages/ZombieBehaviorsPage";
import SimulatorPage from "./pages/SimulatorPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/weapons" element={<WeaponsPage />} />
          <Route path="/zombie-behaviors" element={<ZombieBehaviorsPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
