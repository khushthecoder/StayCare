const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getComments = async (req, res) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    try {
        const comments = await prisma.foodComment.findMany({
            where: {
                createdAt: { gte: startOfDay }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postComment = async (req, res) => {
    const { text, role } = req.body;
    if (role !== 'STUDENT') return res.status(403).json({ error: "Only students can post feedback" });
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
        const comment = await prisma.foodComment.create({
            data: { text }
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likeComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.foodComment.update({
            where: { id: parseInt(id) },
            data: { likes: { increment: 1 } }
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getComments, postComment, likeComment };
