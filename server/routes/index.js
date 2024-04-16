import { Router } from "express";

import authRoutes from "./auth.js";
import postRoutes from "./post.js";
import commentRoutes from "./comment.js";
import favoritesRoutes from "./favorites.js";
import followerRoutes from "./follower.js";
import chatRoutes from "./chat.js";
import imageUploadRoutes from "./imageupload.js";
import likeRoutes from "./like.js";
import commentReply from "./commentreplies.js";
import openaiRoutes from "./openai.js";

const apiRouter = Router();

apiRouter.use(authRoutes);
apiRouter.use(postRoutes);
apiRouter.use(commentRoutes);
apiRouter.use(favoritesRoutes);
apiRouter.use(followerRoutes);
apiRouter.use(chatRoutes);
apiRouter.use(imageUploadRoutes);
apiRouter.use(likeRoutes);
apiRouter.use(commentReply);
apiRouter.use(openaiRoutes);

export { apiRouter };
