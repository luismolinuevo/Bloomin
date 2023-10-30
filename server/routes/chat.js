import {Router} from "express";
import * as chatControllers from "../controllers/chat.js"
import passport from "passport";

const router = Router();

router.post("/createroom", chatControllers.createRoom);
router.get("/userchats", passport.authenticate("jwt", { session: false }), chatControllers.userChats);
router.get("/chat/:id", chatControllers.getRoom);