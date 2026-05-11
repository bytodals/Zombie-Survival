import { Router, RequestHandler } from "express";
import * as controller from "../controllers/weaponController";

const router = Router();

router.get("/", controller.getAll as RequestHandler);
router.get<{ id: string }>("/:id", controller.get as unknown as RequestHandler<{ id: string }>);

export default router;