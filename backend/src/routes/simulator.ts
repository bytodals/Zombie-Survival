import { Router } from "express";
import * as controller from "../controllers/simulatorController";

const router = Router();

router.get("/overview", controller.getOverview);

export default router;
