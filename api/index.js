const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Başta yerleştirin
const connectDB = require('./config/connectDb');
const router = require('./routes/index');
const cookieParser = require('cookie-parser'); // Düzeltilmiş isim

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // Düzeltilmiş isim

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' + PORT });
});

/* middleware */
app.use("/api", router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
