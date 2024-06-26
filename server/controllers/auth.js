import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });
    if (foundUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      // hashing password
      try {
        const hashPassword = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
          },
        });

        if (newUser) {
          return res.status(201).json({
            success: true,
            message: "User successfully created",
          });
        } else {
          return res.status(500).json({
            success: false,
            message: "User was not created. Please create a account",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "User was not created. Something happened",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        userName: req.body.userName,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          req.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              userName: foundUser.userName,
              email: foundUser.email,
            },
            process.env.JSON_KEY
          );

          return res.status(200).json({
            success: true,
            token: token,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Incorrect userName or password",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getUserAuthInfo = async (req, res) => {
  try {
    if (req.user != null) {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (user) {
        return res.status(200).json({
          success: true,
          data: user,
          message: "Returned user data",
        });
      } else {
        return res.status(200).json({
          success: false,
          data: user,
          message: "No user found",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "User is not logged in",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong getting user auth info",
    });
  }
};

const getUserProfileInfo = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (user_id) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(user_id),
        },
      });

      if (user) {
        //get follower count
        const followerCount = await prisma.follower.count({
          where: {
            followingId: parseInt(user_id),
          },
        });

        //get following count
        const followingCount = await prisma.follower.count({
          where: {
            followerId: parseInt(user_id),
          },
        });

        let isFollowing;
        const checkIfFollowing = await prisma.follower.findFirst({
          where: {
            followerId: req.user.id,
            followingId: parseInt(user_id),
          },
        });

        if (checkIfFollowing) {
          isFollowing = true;
        } else {
          isFollowing = false;
        }

        //get post count
        const postCount = await prisma.post.count({
          where: {
            userId: parseInt(user_id),
          },
        });

        return res.status(200).json({
          message: "Returning user data",
          success: true,
          user,
          followerCount,
          followingCount,
          postCount,
          isFollowing,
        });
      } else {
        console.log("No user with that id");
        return res.status(404).json({
          message: "No user with that id found",
          success: false,
          user: [],
        });
      }
    } else {
      console.log("No id given");
      return res.status(404).json({
        message: "No user id given",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const googleCallBack = async (req, res) => {
  const token = req.user; // req.user now contains the JWT token
  res.redirect(`http://localhost:3000/posts?token=${token}`);
};

const editProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });

    if (user) {
      const editUser = await prisma.user.updateMany({
        where: {
          id: parseInt(user_id),
        },
        data: {
          userName: req.body.userName,
          imageUrl: req.body.imageUrl,
        },
      });

      res.status(200).json({
        success: true,
        message: "Edit profile successfully",
        editUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No user with that Id found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export {
  signup,
  login,
  getUserAuthInfo,
  googleCallBack,
  getUserProfileInfo,
  editProfile,
};
