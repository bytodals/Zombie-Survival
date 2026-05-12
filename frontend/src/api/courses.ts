import { apiGet } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type { ApiListResponse, Course } from "../../../backend/shared/types/api";

export const getCourses = () => apiGet<ApiListResponse<Course>>(API_ENDPOINTS.courses);
