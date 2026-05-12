import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, Participant } from "../../../backend/shared/types/api";

export const getParticipants = () =>
  apiGet<ApiListResponse<Participant>>(API_ENDPOINTS.participants);
