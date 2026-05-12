import { Request, Response, NextFunction } from "express";
import * as service from "../services/courseService";
import { sendSuccess } from "../utils/responseHandler";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getAllCourses();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};