import { Router } from "express";
import passport from "passport";
import * as openaiControllers from "../controllers/openai.js";

const router = Router();

router.post(
  "/askai",
  passport.authenticate("jwt", { session: false }),
  openaiControllers.generateAdvice
);

export default router;
