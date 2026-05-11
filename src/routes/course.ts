import { Router } from "express";
import * as controller from "../controllers/courseController";

const router = Router();

router.get("/", controller.getAll);

export default router;