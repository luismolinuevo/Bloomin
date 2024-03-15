import { Router } from "express";
import * as likeControllers from "../controllers/like.js"
import passport from "passport";

const router = Router();

router.post("/postlike/:post_id", passport.authenticate("jwt", { session: false }), likeControllers.postLike);

export default router;