import prisma from "../db/index.js";

const createRoom = async (req, res) => {
  try {
    const { userId, userTwoId } = req.body;
    const chatroom = await prisma.chatRoom.create({
      data: {
        users: {
          connect: [{ id: Number(userId) }, { id: Number(userTwoId) }],
        },
      },
      include: { users: true },
    });

    return res.status(201).json({
      success: true,
      chatroom,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const userChats = async (req, res) => {
  try {
    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        users: {
          some: {
            id: parseInt(req.user.id),
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createAt: "asc",
          },
        },
        users: true,
      },
    });

    return res.status(200).json({
      success: true,
      chatRooms,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getRoom = async (req, res) => {
  try {
    const chatId = req.params.id;

    const getChat = await prisma.chatRoom.findFirst({
      where: {
        id: Number(chatId),
      },
      include: {
        messages: true,
        users: true,
      },
    });

    return res.status(200).json({
      success: true,
      getChat,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export { getRoom, createRoom, userChats };
