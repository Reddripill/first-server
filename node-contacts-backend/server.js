const express = require('express');
const connectDB = require('./config/DBConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})