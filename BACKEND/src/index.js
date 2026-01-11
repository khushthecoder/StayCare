const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const authController = require('./controllers/auth');

app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);
app.post('/api/google-login', authController.googleLogin);

app.get('/api/health', (req, res) => res.json({ status: 'Live', origin: req.headers.origin }));

app.use('/api', foodRoutes);
app.use('/api', complaintRoutes);

app.use((req, res) => {
    console.log(`404 for: ${req.method} ${req.url}`);
    res.status(404).json({ error: `Not Found: ${req.url}` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
