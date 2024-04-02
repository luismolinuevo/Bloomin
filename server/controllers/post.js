import prisma from "../db/index.js";

const createPost = async (req, res) => {
  try {
    console.log(req.body.img);
    const newPost = await prisma.post.create({
      data: {
        cost: req.body.cost,
        title: req.body.title,
        implementationDifficulty: req.body.implementationDifficulty,
        city: req.body.city,
        livingSituation: req.body.livingSituation,
        description: req.body.description,
        user: { connect: { id: req.user.id } },
        img: req.body.img,
      },
    });

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    //check if post exist
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(post_id),
      },
    });

    //if post exist then delete the post
    if (post) {
      const delPost = await prisma.post.deleteMany({
        where: {
          id: parseInt(post_id),
        },
      });

      return res.status(200).json({
        success: true,
        message: "Post delete successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No post with that Id",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const { cursor, limit = 15, sort } = req.query;

    // Define the default sort order
    let orderBy = { createdAt: "desc" }; // Default to newest to oldest

    // Handle different sorting criteria
    if (sort === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sort === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "most_liked") {
      orderBy = { like: { _count: "desc" } }; // Sort by the count of likes in descending order
    }

    // Retrieve posts with associated user, applying pagination
    let posts;
    if (cursor) {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          like: true,
        },
        cursor: {
          id: parseInt(cursor),
        },
        take: limit,
        orderBy,
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          like: true,
        },
        take: limit,
        orderBy,
      });
    }

    // Check if posts are found
    if (posts.length >= 0) {
      // Iterate over each post to retrieve additional data
      const postsWithData = await Promise.all(
        posts.map(async (post) => {
          // Retrieve comment count for the post
          const commentCount = await prisma.comment.count({
            where: {
              postId: post.id,
            },
          });

          const commentReplyCount = await prisma.commentReply.count({
            where: {
              postId: post.id,
            },
          });

          const totalCommentCount = commentCount + commentReplyCount;

          // Retrieve like count for the post
          const likeCount = await prisma.like.count({
            where: {
              postId: post.id,
              type: "like",
            },
          });

          // Retrieve favorite count for the post
          const favCount = await prisma.favorites.count({
            where: {
              postId: post.id,
            },
          });

          const userFav = await prisma.favorites.findFirst({
            where: {
              postId: post.id,
              userId: req.user.id,
            },
          });
          // Check if the user has already liked the post
          const userLike = await prisma.like.findFirst({
            where: {
              postId: post.id,
              userId: req.user.id,
            },
          });

          // Return the post object with comment count, like count, and favorite count
          return {
            ...post,
            commentCount: totalCommentCount,
            likeCount,
            favCount,
            userLike: userLike ? userLike.type : false,
            userFav: userFav ? true : false,
          };
        })
      );

      return res.status(200).json({
        success: true,
        posts: postsWithData,
      });
    } else {
      console.log("Error: No posts found");
      return res.status(404).json({
        message: "No posts found",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
      },
      include: {
        user: true,
      },
    });

    if (post) {
      const commentCount = await prisma.comment.count({
        where: {
          postId: parseInt(postId),
        },
      });

      const commentReplyCount = await prisma.commentReply.count({
        where: {
          postId: parseInt(postId),
        },
      });

      const totalCommentCount = commentCount + commentReplyCount;

      const likeCount = await prisma.like.count({
        where: {
          postId: parseInt(postId),
          type: "like",
        },
      });

      const favCount = await prisma.favorites.count({
        where: {
          postId: parseInt(postId),
        },
      });

      const userFav = await prisma.favorites.findFirst({
        where: {
          postId: parseInt(postId),
          userId: req.user.id,
        },
      });

      const userLike = await prisma.like.findFirst({
        where: {
          postId: parseInt(postId),
          userId: req.user.id,
        },
      });

      const postData = {
        ...post,
        commentCount: totalCommentCount,
        likeCount,
        favCount,
        userLike: userLike ? userLike.type : false,
        userFav: userFav ? true : false,
      };

      return res.status(200).json({
        message: "Success",
        success: true,
        post: postData,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Post with that ID not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const editPost = async (req, res) => {
  try {
    const { post_id } = req.query;

    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (post) {
      const post = await prisma.post.updateMany({
        where: {
          id: post_id,
        },
        data: {
          cost: req.body.cost,
          title: req.body.title,
          implementationDifficulty: req.body.implementationDifficulty,
          city: req.body.city,
          livingSituation: req.body.livingSituation,
          description: req.body.description,
          user: { connect: { id: req.user.id } },
          img: req.body.img,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Edited post successfully",
        post
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No post with that Id found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export { createPost, getAllPost, getPost, deletePost, editPost };
