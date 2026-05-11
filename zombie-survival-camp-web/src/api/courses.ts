import { apiGet } from "./client";
import type { ApiListResponse, Course } from "../../../shared/types/api";

export const getCourses = () => apiGet<ApiListResponse<Course>>("/course");
