const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());


app.use(authRoutes);
app.use(foodRoutes);
app.use(complaintRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
