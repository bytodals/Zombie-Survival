import express from "express";
import cors from "cors";

import participantRouter from "./routes/participant";
import zombieBehaviorRouter from "./routes/zombieBehavior";
import courseRouter from "./routes/course";
import weaponRouter from "./routes/weapon";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

// CORS middleware - allow all localhost origins
app.use(cors({
  origin: "*",
  credentials: false
}));

app.use(express.json());


app.use("/participant", participantRouter);
app.use("/zombie-behavior", zombieBehaviorRouter);
app.use("/course", courseRouter);
app.use("/weapon", weaponRouter);

// fallback
app.use(notFoundMiddleware as express.RequestHandler);

// error handler
app.use(errorMiddleware);

export default app;