const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getComplaintsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const complaints = await prisma.complaint.findMany({
            where: { category }
        });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postComplaint = async (req, res) => {
    const { category, roomNumber, description, role } = req.body;
    if (role !== 'STUDENT') return res.status(403).json({ error: "Only students can log complaints" });
    try {
        const complaint = await prisma.complaint.create({
            data: { category, roomNumber, description }
        });
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const toggleComplaintStatus = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== 'WARDEN') {
        return res.status(403).json({ error: "Only wardens can resolve complaints" });
    }

    try {
        const current = await prisma.complaint.findUnique({ where: { id: parseInt(id) } });
        const newStatus = current.status === "OPEN" ? "RESOLVED" : "OPEN";
        const complaint = await prisma.complaint.update({
            where: { id: parseInt(id) },
            data: { status: newStatus }
        });
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getComplaintsByCategory, postComplaint, toggleComplaintStatus };
