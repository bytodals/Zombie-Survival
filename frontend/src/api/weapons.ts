import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, Weapon } from "../../../backend/shared/types/api";

export const getWeapons = () => apiGet<ApiListResponse<Weapon>>(API_ENDPOINTS.weapons);
