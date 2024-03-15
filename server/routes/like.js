import { Router } from "express";
import * as likeControllers from "../controllers/like.js";
import passport from "passport";

const router = Router();

router.post(
  "/postlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  likeControllers.postLike
);
router.post(
  "/commentlike/:comment_id",
  passport.authenticate("jwt", { session: false }),
  likeControllers.commentLike
);
router.post(
  "/commentreplylike/:comment_id",
  passport.authenticate("jwt", { session: false }),
  likeControllers.commentReplyLike
);

export default router;
