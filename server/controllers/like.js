import prisma from "../db/index.js";

const postLike = async (req, res) => {
  const { post_id } = req.params;
  const { type } = req.query;

  try {
    // Getting the post
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(post_id),
      },
    });

    // If there is a post with the post_id
    if (post) {
      // See if like exists with the post and user id
      const existingLike = await prisma.like.findFirst({
        where: {
          postId: parseInt(post_id),
          userId: req.user.id,
        },
      });

      // If existingLike
      if (existingLike) {
        // If the existing like type is the same as the requested type, delete the like
        if (existingLike.type === type) {
          await prisma.like.delete({
            where: {
              id: existingLike.id,
            },
          });
          return res.status(200).json({
            message: "Unliked post",
            success: true,
          });
        } else {
          // If the existing like type is different, update the like type
          const updatedLike = await prisma.like.update({
            where: {
              id: existingLike.id,
            },
            data: {
              type: type,
            },
          });
          return res.status(200).json({
            message: "Updated like type",
            success: true,
            updatedLike,
          });
        }
      } else {
        // Create a new like
        const likePost = await prisma.like.create({
          data: {
            type: type,
            postId: parseInt(post_id),
            userId: req.user.id,
          },
        });
        if (likePost) {
          return res.status(200).json({
            message: "Liked post",
            success: true,
            likePost,
          });
        } else {
          return res.status(500).json({
            message: "Error creating like",
            success: false,
          });
        }
      }
    } else {
      return res.status(404).json({
        message: "No post with that id found. Make sure id is valid",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

const commentLike = async (req, res) => {
  const { comment_id } = req.params;
  const { type } = req.body;

  try {
    // Getting the comment
    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(comment_id),
      },
    });

    // If there is a comment with the comment_id
    if (comment) {
      // See if like exists with the comment and user id
      const existingLike = await prisma.like.findFirst({
        where: {
          commentId: parseInt(comment_id),
          userId: req.user.id,
        },
      });

      // If existingLike
      if (existingLike) {
        // If the existing like type is the same as the requested type, delete the like
        if (existingLike.type === type) {
          await prisma.like.delete({
            where: {
              id: existingLike.id,
            },
          });
          return res.status(200).json({
            message: "Unliked comment",
            success: true,
          });
        } else {
          // If the existing like type is different, update the like type
          const updatedLike = await prisma.like.update({
            where: {
              id: existingLike.id,
            },
            data: {
              type: type,
            },
          });
          return res.status(200).json({
            message: "Updated comment like type",
            success: true,
            updatedLike,
          });
        }
      } else {
        // Create a new like
        const likeComment = await prisma.like.create({
          data: {
            type: type,
            commentId: parseInt(comment_id),
            userId: req.user.id,
          },
        });
        if (likeComment) {
          return res.status(200).json({
            message: "Liked comment",
            success: true,
            likeComment,
          });
        } else {
          return res.status(500).json({
            message: "Error creating like",
            success: false,
          });
        }
      }
    } else {
      return res.status(404).json({
        message: "No comment with that id found. Make sure id is valid",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

const commentReplyLike = async (req, res) => {
  const { comment_id } = req.params;
  const { type } = req.body;

  try {
    //Getting the comment rely
    const comment = await prisma.commentReply.findFirst({
      where: {
        id: parseInt(comment_id),
      },
    });

    //If there is a comment with comment id
    if (comment) {
      //See if like exist with the post and user id
      const existingLike = await prisma.like.findFirst({
        where: {
          commentReply: parseInt(comment_id),
          userId: req.user.id,
        },
      });

      //If exisitingLike
      if (existingLike) {
        return res.status(400).json({
          message: "You have already liked this comment",
          success: false,
        });
        //Create
      } else {
        const likeComment = await prisma.like.create({
          data: {
            type: type,
            commentReply: parseInt(comment_id),
            userId: req.user.id,
          },
        });

        if (likeComment) {
          return res.status(200).json({
            message: "Liked comment",
            success: true,
            likeComment,
          });
        } else {
          return res.status(500).json({
            message: "Error creating like",
            success: false,
          });
        }
      }
    } else {
      return res.status(404).json({
        message: "No comment with that id found. Make sure id is valid",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

export { postLike, commentLike, commentReplyLike };
