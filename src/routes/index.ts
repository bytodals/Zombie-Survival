import { Router } from "express";

import participantRoutes from "./participant.js";
import courseRoutes from "./course.js";
import weaponRoutes from "./weapon.js";
import zombieBehaviorRoutes from "./zombieBehavior.js";

const router = Router();

router.use("/participant", participantRoutes);
router.use("/course", courseRoutes);
router.use("/weapon", weaponRoutes);
router.use("/zombieBehavior", zombieBehaviorRoutes);

export default router;