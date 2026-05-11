import { QueryResult } from "mysql2";
import * as service from "../services/courseService.js";

export const getAll = async (req: any, res: { json: (arg0: { success: boolean; count: any; data: QueryResult; }) => void; }, next: (arg0: unknown) => void) => {
  try {
    const data = await service.getAllCourses();

    res.json({
      success: true,
      count: Array.isArray(data) ? data.length : 0,
      data
    });
  } catch (err) {
    next(err);
  }
};