import prisma from "../db/index.js";

const favoritePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const favpost = await prisma.favorites.post({
        data: {
          userId: req.body.userId,
          postId: postId,
        },
      });
  
      if (favpost) {
        return res.status(201).json({
          success: true,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Someting went wrong" });
    }
  };

  const getFavorites = async (req, res) => {
    try {

    } catch(error) {
        return res.status(500).json({ error: "Someting went wrong" });
    }
  }