import { Router } from "express";
import * as commentRepliesControllers from "../controllers/commentreplies.js";
import passport from "passport";

const router = Router();

router.get(
  "/commentreply/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentRepliesControllers.getCommentReplies
);
router.post(
  "/commentreply/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentRepliesControllers.addCommentReply
);
router.delete(
  "/commentreply/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentRepliesControllers.deleteComment
);

export default router;
