import prisma from "../db/index.js";

const addCommentReply = async (req, res) => {
  try {
    const { comment_id } = req.params;
    if (comment_id != null) {
      const newComment = await prisma.commentReply.create({
        data: {
          textbody: req.body.textbody,
          userId: req.user.id,
          commentId: parseInt(comment_id),
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
    return res
      .status(500)
      .json({ error: error, message: "Error creating comment reply" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_Id } = req.params;
    const deleteComment = await prisma.commentReply.deleteMany({
      where: {
        id: comment_Id,
      },
    });

    if (deleteComment) {
      return res.status(200).json({
        success: true,
        message: "Deleted comment reply"
      });
    }

    return res.status(404).json({
      success: false,
      message: "Unable to delete commment reply",
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong", error: error });
  }
};

const getComments = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { sortBy } = req.query;

    if (post_id) {
      // let orderBy;

      // switch(sortBy) {
      //   case "newest":
      //     orderBy = { } //need to add date and likes/dislikes to comment
      // }
      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(post_id),
        },
      });

      if (comments) {
        return res.status(200).json({
          success: true,
          message: "Fetched all comments",
          comments,
        });
      } else {
        return res.status(404).json({});
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "No post_id",
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

export { addComment, deleteComment, getComments };
