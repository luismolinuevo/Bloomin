import { Router } from "express";

import authRoutes from "./auth.js";
import postRoutes from "./post.js";

const apiRouter = Router();

apiRouter.use(authRoutes);
apiRouter.use(postRoutes);

export {apiRouter}