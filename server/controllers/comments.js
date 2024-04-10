import prisma from "../db/index.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    if (postId != null) {
      const newComment = await prisma.comment.create({
        data: {
          textbody: req.body.textbody,
          user: { connect: { id: req.user.id } },
          post: { connect: { id: parseInt(postId) } },
        },
      });

      if (newComment) {
        return res.status(200).json({
          success: true,
          message: "New comment created",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Error creating post",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "PostId invalid",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, message: "Error creating comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await prisma.comment.deleteMany({
      where: {
        id: commentId,
      },
    });

    if (deleteComment) {
      return res.status(200).json({
        success: true,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Unable to delete commment",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong", error });
  }
};

const getComments = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { sortBy } = req.query;

    if (post_id) {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(post_id),
        },
        include: {
          user: true,
        },
      });

      if (comments) {
        const commentsWithData = await Promise.all(
          comments.map(async (comment) => {
            const commentReplyCount = await prisma.commentReply.count({
              where: {
                commentId: comment.id,
              },
            });

            const commentLikeCount = await prisma.like.count({
              where: {
                commentId: comment.id,
                type: "like",
              },
            });

            const userLike = await prisma.like.findFirst({
              where: {
                commentId: parseInt(comment.id),
                userId: req.user.id,
              },
            });
            // Return the comment object with reply count
            return {
              ...comment,
              success: true,
              message: "Fetched all comments",
              commentReplyCount,
              commentLikeCount,
              userLike: userLike ? userLike.type : false,
            };
          })
        );

        return res.status(200).json({
          success: true,
          message: "Fetched all comments with reply count",
          comments: commentsWithData,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No comments found for this post",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "No post_id provided",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export { addComment, deleteComment, getComments };
