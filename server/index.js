import express, { application } from "express";
import morgan from "morgan";
import setupJWTStrategy from "./middlewares/passportjwt.js";
import passport from "./middlewares/passport-config.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { apiRouter } from "./routes/index.js";

export default async function createServer() {
  const PORT = process.env.PORT;

  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(morgan("tiny"));

  app.use(passport.initialize());
  setupJWTStrategy(passport);

  app.use("/api", apiRouter);

  // app.listen(PORT || 5000, () => {
  //   console.log("Connected to express server");
  // });
  return app;
}
