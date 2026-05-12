import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, SimulatorOverview } from "../../../backend/shared/types/api";

export const getSimulatorOverview = async (): Promise<SimulatorOverview> => {
  const response = await apiGet<ApiListResponse<SimulatorOverview>>(API_ENDPOINTS.simulatorOverview);
  return response.data;
};
