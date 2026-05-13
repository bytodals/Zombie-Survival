import { Router } from "express";
import * as controller from "../controllers/simulatorController.js";

const router = Router();

router.get("/overview", controller.getOverview);

export default router;
