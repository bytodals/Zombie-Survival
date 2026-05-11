import { apiGet } from "./client";
import type { ApiListResponse, ZombieBehavior } from "../../../shared/types/api";

export const getZombieBehaviors = () =>
  apiGet<ApiListResponse<ZombieBehavior>>("/zombie-behavior");
