import { apiGet } from "./client";
import type { ApiListResponse, Weapon } from "../types/api";

export const getWeapons = () => apiGet<ApiListResponse<Weapon>>("/weapon");