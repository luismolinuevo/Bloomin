import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import dotenv from "dotenv";
import passport from "passport";
// import googlePassport from "../auth/GoogleLogin.js";
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
  // if (req.user != null) {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
  // } else {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Not logged in",
  //   });
  // }
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
            followerId: parseInt(user_id),
          },
        });

        //get following count
        const followingCount = await prisma.follower.count({
          where: {
            followingId: parseInt(user_id),
          },
        });

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
  res.redirect(`http://localhost:3000?token=${token}`);
};

export { signup, login, getUserAuthInfo, googleCallBack, getUserProfileInfo };
