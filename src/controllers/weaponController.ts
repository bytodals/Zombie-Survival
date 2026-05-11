import { RequestHandler } from "express";
import { QueryResult } from "mysql2";
import * as service from "../services/weaponService.js";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.getAllWeapons();

    res.json({
      success: true,
      count: Array.isArray(data) ? data.length : 0,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const get: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const data = await service.getWeaponById(req.params.id);

    if (!Array.isArray(data) || !data.length) {
      return res.status(404).json({
        success: false,
        message: "Weapon not found"
      });
    }

    res.json({
      success: true,
      data: data[0]
    });
  } catch (err) {
    next(err);
  }
};
