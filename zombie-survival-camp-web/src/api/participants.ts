import { apiGet } from "./client";
import type { ApiListResponse, Participant } from "../types/api";

export const getParticipants = () =>
  apiGet<ApiListResponse<Participant>>("/participant");
