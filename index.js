const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

app.use(express.json());
connectDB();
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/profiles', require('./routes/profileRoutes'))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)

})