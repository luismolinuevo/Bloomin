import {Router} from "express";
import * as authControllers from "../controllers/auth"

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

export default router;

