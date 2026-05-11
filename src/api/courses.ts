import { apiGet } from "./client";
import type { ApiListResponse, Course } from "../types/api";

export const getCourses = () => apiGet<ApiListResponse<Course>>("/course");