import prisma from "../db/index.js";

/*------------------Get user following-------------------- */
const getUserFollowers = async (req, res) => {
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

/*------------------Get user followers-------------------- */
const getUserFollowing = async (req, res) => {
  try {
    const { user_id } = req.params;

    const followers = await prisma.follower.findMany({
      where: {
        followerId: user_id,
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
        followerId: req.user.id,
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

const unFollowUser = async (req, res) => {
  try {
    const { followingId } = req.body;

    if (followingId) {
      const follow = await prisma.follower.deleteMany({
        data: {
          followingId: followingId,
          followerId: req.user.id,
        },
      });

      if (follow) {
        return res.status(200).json({
          success: true,
          message: "Unfollowed user successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

export { followUser, getUserFollowing, getUserFollowers, unFollowUser };
