import express from "express";

import participantRouter from "./routes/participant.js";
import zombieBehaviorRouter from "./routes/zombieBehavior.js";
import courseRouter from "./routes/course.js";
import weaponRouter from "./routes/weapon.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

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