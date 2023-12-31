import {Router} from "express";
import * as followerControllers from "../controllers/follower.js";
import passport from "passport";

const router = Router();

router.post("/followeruser", followerControllers.followUser);
router.get("/getfollowing/:user_id", followerControllers.getUserFollowing);
router.get("/getfollowers/:user_id", followerControllers.getUserFollowers);


export default router;
