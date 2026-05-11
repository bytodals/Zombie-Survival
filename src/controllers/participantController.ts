import { QueryResult } from "mysql2";
import * as service from "../services/participantService.js";

export const getAll = async (req: any, res: { json: (arg0: { success: boolean; count: any; data: QueryResult; }) => void; }, next: (arg0: unknown) => void) => {
  try {
    const data = await service.getAllParticipants();

    res.json({
      success: true,
      count: Array.isArray(data) ? data.length : 0,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): any; new(): any; }; }; json: (arg0: { success: boolean; data: any; }) => void; }, next: (arg0: unknown) => void) => {
  try {
    const data = await service.getParticipantById(req.params.id);

    if (!Array.isArray(data) || !data.length) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
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