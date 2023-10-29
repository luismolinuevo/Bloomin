import { Router } from "express";

import authRoutes from "./auth.js";
import postRoutes from "./post.js";
import commentRoutes from "./comment.js";

const apiRouter = Router();

apiRouter.use(authRoutes);
apiRouter.use(postRoutes);
apiRouter.use(commentRoutes);

export { apiRouter }