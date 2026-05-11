import { QueryResult } from "mysql2";
import * as service from "../services/zombieBehaviorService.js";

export const getAll = async (req: any, res: { json: (arg0: { success: boolean; count: any; data: QueryResult; }) => void; }, next: (arg0: unknown) => void) => {
  try {
    const data = await service.getAllZombieBehaviors();

    const count = Array.isArray(data) ? data.length : 0;

    res.json({
      success: true,
      count,
      data
    });
  } catch (err) {
    next(err);
  }
};