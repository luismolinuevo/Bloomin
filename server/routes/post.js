import { Router } from "express";
import * as postControllers from "../controllers/post.js";
import passport from "passport";

const router = Router();

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  postControllers.createPost
);

router.put(
  "/post/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.editPost
);

router.delete(
  "/post/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deletePost
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

router.get(
  "/userpost/:user_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.getAllUserPost
);


export default router;
