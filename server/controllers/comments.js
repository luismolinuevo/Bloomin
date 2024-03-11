import prisma from "../db/index.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const newComment = await prisma.comment.create({
      data: {
        textbody: req.body.textbody,
        userId: req.user.id,
        postId: postId,
      },
    });

    if (newComment) {
      return res.status(200).json({
        success: true,
        message: "New comment created",
      });
    }

    return res.status(404).json({
      success: false,
      message: "Error creating post",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
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
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

const getComments = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (post_id) {
      const comments = await prisma.comment.findAll({
        where: {
          post_id: post_id,
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
    return res.status(500).json({
      message: "Server error",
      error: error,
      success: false,
    });
  }
};

export { addComment, deleteComment, getComments };
