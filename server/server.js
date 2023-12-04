import express, { application } from "express";
import morgan from "morgan";
import setupJWTStrategy from "./middlewares/passportjwt.js";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()

import { apiRouter } from "./routes/index.js";

const PORT = process.env.PORT

const app = express();
app.use(express.json());

app.use(cors())
app.use(morgan("tiny"));

setupJWTStrategy(passport);

app.use("/api", apiRouter);

app.listen(PORT || 5001, () => {
    console.log("Connected to express server");
})