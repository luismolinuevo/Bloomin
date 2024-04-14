import { Router } from "express";
import * as authControllers from "../controllers/auth.js";
import passport from "passport";
// import googlePassport from "../middlewares/GoogleLogin.js";

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authControllers.getUserAuthInfo
);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  authControllers.googleCallBack
);

router.get(
  "/userprofile/:user_id",
  passport.authenticate("jwt", { session: false }),
  authControllers.getUserProfileInfo
);

router.update(
  "/userprofile/:user_id",
  passport.authenticate("jwt", { session: false }),
  authControllers.editProfile
);

export default router;
