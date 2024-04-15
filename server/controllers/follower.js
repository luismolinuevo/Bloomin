import prisma from "../db/index.js";

/*------------------Get user following-------------------- */
const getUserFollowers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username } = req.query;

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

      return res.status(200).json({
        success: true,
        followers: followerUsers,
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

    const followers = await prisma.follower.findMany({
      where: whereCondition,
    });

    if (followers && followers.length > 0) {
      //the relation wasnt working with prisma
      const followingUsers = await prisma.user.findMany({
        where: {
          id: {
            in: followers.map((follower) => follower.followingId),
          },
        },
        select: {
          id: true,
          userName: true,
          imageUrl: true,
        },
      });

      return res.status(200).json({
        success: true,
        followers: followingUsers,
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

// const getUserFollowing = async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     const followers = await prisma.follower.findMany({
//       where: {
//         followerId: user_id,
//       },
//     });

//     if (followers) {
//       return res.status(200).json({
//         success: true,
//         followers,
//       });
//     }

//     return res.status(404).json({
//       success: false,
//       message: "No following found for this user",
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Someting went wrong" });
//   }
// };

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
