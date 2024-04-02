import { Router } from "express";
import * as postControllers from "../controllers/post.js";
import passport from "passport";

const router = Router();

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  postControllers.createPost
);

router.delete(
  "/post",
  passport.authenticate("jwt", { session: false }),
  postControllers.createPost
);

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postControllers.getAllPost
);
router.get(
  "/post/:postId",
  passport.authenticate("jwt", { session: false }),
  postControllers.getPost
);

export default router;
