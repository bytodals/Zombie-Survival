import { Router, RequestHandler } from "express";
import * as controller from "../controllers/participantController.js";

const router = Router();

router.get("/", controller.getAll as RequestHandler);
router.get<{ id: string }>("/:id", controller.getById as unknown as RequestHandler<{ id: string }>);
router.get<{ id: string }>("/:id/courses", controller.getParticipantCourses as unknown as RequestHandler<{ id: string }>);

export default router;