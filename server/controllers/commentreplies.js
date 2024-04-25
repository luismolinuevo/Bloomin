import prisma from "../db/index.js";

const addCommentReply = async (req, res) => {
  try {
    const { comment_id } = req.params;
    if (comment_id != null) {
      const newComment = await prisma.commentReply.create({
        data: {
          textbody: req.body.textbody,
          // userId: req.user.id,
          user: { connect: { id: req.user.id } },
          comment: { connect: { id: parseInt(comment_id) } },
          post: { connect: { id: req.body.postId } },
        },
      });

      if (newComment) {
        return res.status(200).json({
          success: true,
          message: "New comment reply created",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Error creating comment reply",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Comment Id invalid",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, message: "Error creating comment reply" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const comment = await prisma.commentReply.findUnique({
      where: {
        id: parseInt(comment_id),
      },
    });

    if (comment) {
      const deleteComment = await prisma.commentReply.deleteMany({
        where: {
          id: parseInt(comment_id),
        },
      });

      return res.status(200).json({
        success: true,
        message: "Deleted comment reply",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Unable to delete commment reply",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", error: error });
  }
};

const getCommentReplies = async (req, res) => {
  try {
    const { comment_id } = req.params;

    if (comment_id != null) {
      const replies = await prisma.commentReply.findMany({
        where: {
          commentId: parseInt(comment_id),
        },
        include: {
          user: true,
        },
      });

      if (replies) {
        const repliesWithData = await Promise.all(
          replies.map(async (reply) => {
            const replyLikeCount = await prisma.like.count({
              where: {
                commentReply: reply.id,
                type: "like",
              },
            });

            const userLike = await prisma.like.findFirst({
              where: {
                commentReply: parseInt(reply.id),
                userId: req.user.id,
              },
            });
            // Return the reply object with like count and user's like status
            return {
              ...reply,
              success: true,
              message: "Fetched all comment replies",
              replyLikeCount,
              userLike: userLike ? userLike.type : false,
            };
          })
        );

        return res.status(200).json({
          success: true,
          message: "Fetched all comment replies with like count",
          comments: repliesWithData,
        });
      } else {
        return res.status(204).json({
          success: false,
          message: "No comment replies found with that Id",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "No comment_id",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error,
      success: false,
    });
  }
};


export { addCommentReply, deleteComment, getCommentReplies };
