import prisma from "../db/index.js";

const favoritePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const favpost = await prisma.favorites.post({
      data: {
        userId: req.user.id,
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
    const getFavs = await prisma.favorites.findMany({
      where: {
        userId: req.user.id,
      },
    });

    if (getFavs) {
      return res.status(201).json({
        success: true,
        getFavs,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Cant get favorites with this userId",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const deleteFav = await prisma.favorites.deleteMany({
      where: {
        favoritesId: favoriteId,
      },
    });

    if (deleteFav) {
      return res.status(201).json({
        success: true,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Cant delete favorites",
    });
  } catch (error) {
    return res.status(500).json({ error: "Someting went wrong" });
  }
};

export { favoritePost, getFavorites, deleteFavorite };
