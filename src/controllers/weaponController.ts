import { Request, Response, NextFunction } from "express";
import * as service from "../services/weaponService";
import { sendSuccess } from "../utils/responseHandler";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
    const data = await service.getAllWeapons();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};

export const get = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
 ) => {
  try {
    const data = await service.getWeaponById(req.params.id);

    if (!Array.isArray(data) || !data.length) {
      return res.status(404).json({
        success: false,
        message: "Weapon not found"
      });
    }

    sendSuccess(res, data[0]);
  } catch (err) {
    next(err);
  }
};
