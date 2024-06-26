import { Router } from "express";
import * as followerControllers from "../controllers/follower.js";
import passport from "passport";

const router = Router();

router.post(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  followerControllers.followUser
);
router.delete(
  "/unfollow/:following_id",
  passport.authenticate("jwt", { session: false }),
  followerControllers.unFollowUser
);
router.get("/following/:user_id", passport.authenticate("jwt", { session: false }), followerControllers.getUserFollowing);
router.get("/followers/:user_id", passport.authenticate("jwt", { session: false }), followerControllers.getUserFollowers);

export default router;
