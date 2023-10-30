import prisma from "../db/index.js";

/*------------------Get user following-------------------- */
const getUserFollowing = async (req, res) => {
  try {
    const { user_id } = req.params;

    const followers = await prisma.follower.findMany({
      where: {
        followingId: user_id,
      },
    });

    if (followers) {
      return res.status(200).json({
        success: true,
        followers,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No following found for this user",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

/*-------------------Follower a user----------------------- */
const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follow = await prisma.follower.create({
      data: {
        followingId: followingId,
        followerId: followerId,
      },
    });

    if (follow) {
      return res.status(200).json({
        success: true,
        message: "Follow user worked",
      });
    }

    return res.status(404).json({
      success: false,
      message: "Follow user not working",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

export { followUser, getUserFollowing };
