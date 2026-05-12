import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, SimulatorOverview } from "../../../backend/shared/types/api";

export const getSimulatorOverview = () =>
  apiGet<SimulatorOverview>(API_ENDPOINTS.simulatorOverview);
