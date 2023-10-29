import {Router} from "express";
import * as commentControllers from "../controllers/comments.js";
import passport from "passport";

const router = Router();

router.post("/addcomment/:postId", passport.authenticate("jwt", { session: false }), commentControllers.addComment);
router.delete("/deletecomment/:commentId", passport.authenticate("jwt", { session: false }), commentControllers.deleteComment);

export default router;