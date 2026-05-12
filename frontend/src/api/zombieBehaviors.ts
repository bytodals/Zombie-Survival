import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, ZombieBehavior } from "../../../backend/shared/types/api";

export const getZombieBehaviors = () =>
  apiGet<ApiListResponse<ZombieBehavior>>(API_ENDPOINTS.zombieBehaviors);
