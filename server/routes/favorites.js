import {Router} from "express";
import * as favoritesControllers from "../controllers/favorites.js"
import passport from "passport";

const router = Router();

router.get("/getFavorites", passport.authenticate("jwt", { session: false }), favoritesControllers.getFavorites);
router.post("/addFavorite/:postId", passport.authenticate("jwt", { session: false }), favoritesControllers.favoritePost);
router.delete("/removefavorite/:favoriteId", favoritesControllers.deleteFavorite);

export default router;