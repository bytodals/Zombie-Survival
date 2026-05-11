import { apiGet } from "./client";
import type { ApiListResponse, Participant } from "../../../shared/types/api";

export const getParticipants = () =>
  apiGet<ApiListResponse<Participant>>("/participant");
