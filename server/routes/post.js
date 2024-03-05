import {Router} from "express";
import * as postControllers from "../controllers/post.js"
import passport from "passport";

const router = Router();

router.post("/post", passport.authenticate("jwt", { session: false }), postControllers.createPost);
router.put("/vote/:postId", passport.authenticate("jwt", { session: false }), postControllers.vote);
router.get("/posts", postControllers.getAllPost);
router.get("/post/:postId", postControllers.getPost);

export default router;

