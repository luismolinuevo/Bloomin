import prisma from "../db/index.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    if (postId != null) {
      const newComment = await prisma.comment.create({
        data: {
          textbody: req.body.textbody,
          userId: req.user.id,
          postId: parseInt(postId),
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
    return res.status(500).json({ error: "Someting went wrong" });
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
