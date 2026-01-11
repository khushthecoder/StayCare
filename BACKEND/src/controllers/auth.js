const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, password, role }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { email, password }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const googleLogin = async (req, res) => {
    const { token, role } = req.body;
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const { email, name, sub: googleId } = payload;

        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: `GOOGLE_${googleId}`, 
                    role: role || 'STUDENT' 
                }
            });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Google verification failed" });
    }
};

module.exports = { signup, login, googleLogin };
