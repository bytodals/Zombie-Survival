import express from "express";
import cors from "cors";

import participantRouter from "./routes/participant.js";
import zombieBehaviorRouter from "./routes/zombieBehavior.js";
import courseRouter from "./routes/course.js";
import weaponRouter from "./routes/weapon.js";
import simulatorRouter from "./routes/simulator.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

// CORS middleware - allow all localhost origins
app.use(cors({
  origin: "*",
  credentials: false
}));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});


app.use("/participant", participantRouter);
app.use("/zombie-behavior", zombieBehaviorRouter);
app.use("/course", courseRouter);
app.use("/weapon", weaponRouter);
app.use("/simulator", simulatorRouter);

// fallback
app.use(notFoundMiddleware as express.RequestHandler);

// error handler
app.use(errorMiddleware);

export default app;