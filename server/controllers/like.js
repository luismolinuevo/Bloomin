import prisma from "../db/index.js";

const postLike = async (req, res) => {
  const { post_id } = req.params;
  const { type } = req.body;

  try {
    //Getting the post
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(post_id),
      },
    });

    //If there is a post with the post_id
    if (post) {
      //See if like exist with the post and user id
      const existingLike = await prisma.like.findFirst({
        where: {
          postId: parseInt(post_id),
          userId: req.user.id,
        },
      });

      //If exisitingLike
      if (existingLike) {
        return res.status(400).json({
          message: "You have already liked this post",
          success: false,
        });
        //Create
      } else {
        const likePost = await prisma.like.create({
          data: {
            type: type,
            postId: parseInt(post_id),
            userId: req.user.id,
          },
        });

        if (likePost) {
          return res.status(200).json({
            message: "Liked comment",
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

const commentLike = async (req, res) => {};

const commentReplyLike = async (req, res) => {};

export { postLike };
