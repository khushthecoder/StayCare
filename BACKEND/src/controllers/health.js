const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkHealth = async (req, res) => {
    const healthStatus = {
        server: 'Online',
        timestamp: new Date().toISOString(),
        database: 'Checking...',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    };

    try {
        // Try a simple query to verify database connection
        await prisma.$queryRaw`SELECT 1`;
        healthStatus.database = 'Connected';
        res.status(200).json(healthStatus);
    } catch (error) {
        healthStatus.database = 'Disconnected';
        healthStatus.error = error.message;
        res.status(503).json(healthStatus);
    }
};

module.exports = { checkHealth };
