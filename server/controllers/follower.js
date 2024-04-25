import prisma from "../db/index.js";

/*------------------Get user following-------------------- */
const getUserFollowers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username } = req.query;
    const loggedInUserId = req.user.id; // Assuming the logged-in user ID is available in req.body.id

    let whereCondition = { followingId: parseInt(user_id) }; // Convert user_id to integer
    if (username && username.trim() !== "") {
      // If username is provided and not empty, find the user with that username
      const user = await prisma.user.findFirst({
        where: {
          userName: {
            contains: username,
          },
        },
      });

      if (user) {
        // If user with the provided username exists, filter by userId
        whereCondition = {
          AND: [{ followingId: parseInt(user_id) }, { followerId: user.id }],
        };
      } else {
        // If user with the provided username does not exist, return empty result
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    const followers = await prisma.follower.findMany({
      where: whereCondition,
    });

    if (followers && followers.length > 0) {
      // Get follower users with selected fields
      const followerUsers = await prisma.user.findMany({
        where: {
          id: {
            in: followers.map((follower) => follower.followerId),
          },
        },
        select: {
          id: true,
          userName: true,
          imageUrl: true,
        },
      });

      // Check if the logged-in user is following each follower
      const followersWithFollowingStatus = await Promise.all(
        followerUsers.map(async (follower) => {
          const isFollowing = await prisma.follower.findFirst({
            where: {
              followingId: parseInt(loggedInUserId),
              followerId: follower.id,
            },
          });
          return { ...follower, isFollowing: !!isFollowing };
        })
      );

      return res.status(200).json({
        success: true,
        followers: followersWithFollowingStatus,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No followers found for this user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong", error });
  }
};

/*------------------Get user followers-------------------- */
const getUserFollowing = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username } = req.query;
    const loggedInUserId = req.user.id; // Assuming the logged-in user ID is available in req.body.id

    let whereCondition = { followerId: parseInt(user_id) }; // Convert user_id to integer
    if (username && username.trim() !== "") {
      // If username is provided and not empty, find the user with that username
      const user = await prisma.user.findFirst({
        where: {
          userName: {
            contains: username,
          },
        },
      });

      if (user) {
        // If user with the provided username exists, filter by userId
        whereCondition = {
          AND: [{ followerId: parseInt(user_id) }, { followingId: user.id }],
        };
      } else {
        // If user with the provided username does not exist, return empty result
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    const following = await prisma.follower.findMany({
      where: whereCondition,
    });

    if (following && following.length > 0) {
      // Get following users with selected fields
      const followingUsers = await prisma.user.findMany({
        where: {
          id: {
            in: following.map((follow) => follow.followingId),
          },
        },
        select: {
          id: true,
          userName: true,
          imageUrl: true,
        },
      });

      // Check if the logged-in user is following each user
      const followingUsersWithFollowingStatus = await Promise.all(
        followingUsers.map(async (user) => {
          const isFollowing = await prisma.follower.findFirst({
            where: {
              followingId: user.id,
              followerId: parseInt(loggedInUserId),
            },
          });
          return { ...user, isFollowing: !!isFollowing };
        })
      );

      return res.status(200).json({
        success: true,
        following: followingUsersWithFollowingStatus,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No following found for this user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong", error });
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
    const { following_id } = req.params;

    if (following_id) {
      const follow = await prisma.follower.deleteMany({
        where: {
          followingId: parseInt(following_id),
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
