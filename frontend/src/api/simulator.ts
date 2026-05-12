import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { SimulatorOverview } from "../../../backend/shared/types/api";

export const getSimulatorOverview = async (): Promise<SimulatorOverview> => {
  const response = await apiGet<{ success: boolean; count: number; data: SimulatorOverview }>(API_ENDPOINTS.simulatorOverview);
  return response.data;
};
