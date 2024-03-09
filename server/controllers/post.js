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

const vote = async (req, res) => {
  const { postId } = req.params;
  const type = req.query.type;
  console.log(postId);
  console.log(type);

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existingVote = await prisma.votes.findFirst({
      where: {
        postId: parseInt(postId),
        userId: req.user.id,
      },
    });

    if (existingVote) {
      if (existingVote.type === type) {
        return res.status(200).json({
          error: `You have already ${type}voted this post`,
          success: true,
        });
      } else {
        // Decrement the corresponding vote count if it's greater than 0
        if (existingVote.type === "upvote" && post.upvotes > 0) {
          await prisma.post.update({
            where: { id: parseInt(postId) },
            data: {
              upvotes: { decrement: 1 },
            },
          });
        } else if (existingVote.type === "downvote" && post.downvotes > 0) {
          await prisma.post.update({
            where: { id: parseInt(postId) },
            data: {
              downvotes: { decrement: 1 },
            },
          });
        }

        await prisma.votes.delete({
          where: { id: existingVote.id },
        });
      }
    }

    // Increment the corresponding vote count
    if (type === "upvote") {
      await prisma.post.update({
        where: { id: parseInt(postId) },
        data: { upvotes: { increment: 1 } },
      });
    } else if (type === "downvote") {
      await prisma.post.update({
        where: { id: parseInt(postId) },
        data: { downvotes: { increment: 1 } },
      });
    }

    await prisma.votes.create({
      data: {
        user: { connect: { id: req.user.id } },
        type,
        post: { connect: { id: parseInt(postId) } },
      },
    });

    const updatedVotes = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    return res.status(200).json({
      message: `Successfully ${type}voted the post`,
      success: true,
      updatedVotes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      include: {
        user: true,
      },
    });

    if (post) {
      return res.status(200).json({
        success: "true",
        post,
      });
    } else {
      console.log("Error");
      return res.status(404).json({
        message: "No post found",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
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
      return res.status(200).json({
        message: "Success",
        success: true,
        post,
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

export { createPost, vote, getAllPost, getPost };
