import { Request, Response, NextFunction } from "express";
import * as service from "../services/participantService";
import { sendSuccess } from "../utils/responseHandler";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getAllParticipants();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
 ) => {
  try {
    const data = await service.getParticipantById(req.params.id);

    if (!Array.isArray(data) || !data.length) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    sendSuccess(res, data[0]);
  } catch (err) {
    next(err);
  }
};