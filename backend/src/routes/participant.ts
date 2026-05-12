import { Router, RequestHandler } from "express";
import * as controller from "../controllers/participantController";

const router = Router();

router.get("/", controller.getAll as RequestHandler);
router.get<{ id: string }>("/:id", controller.getById as unknown as RequestHandler<{ id: string }>);

export default router;