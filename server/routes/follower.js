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
router.get("/getfollowing/:user_id", followerControllers.getUserFollowing);
router.get("/getfollowers/:user_id", followerControllers.getUserFollowers);

export default router;
