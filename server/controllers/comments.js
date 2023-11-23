import prisma from "../db/index.js";

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;  
        const newComment = await prisma.comment.create({
            data: {
                textbody: req.body.textbody,
                userId: req.user.id,
                postId: postId
            }
        });

        if(newComment) {
            return res.status(200).json({
                success: true,
                message: "New comment created"
            });
        }

        return res.status(404).json({
            success: false,
            message: "Error creating post"
        });

    } catch(error) {
        return res.status(500).json({ error: "Someting went wrong" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const deleteComment = await prisma.comment.deleteMany({
            where: {
                id: commentId
            }
        });

        if(deleteComment) {
            return res.status(200).json({
                success: true
            });
        }

        return res.status(404).json({
            success: false,
            message: "Unable to delete commment"
        });

    } catch(error) {
        return res.status(500).json({ error: "Someting went wrong" });
    }
}

export {addComment, deleteComment};