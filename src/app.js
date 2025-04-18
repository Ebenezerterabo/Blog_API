import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';


const app = express();

dotenv.config();
const port = process.env.PORT;

//Database connection
connectDB()

//use json in request body
app.use(bodyParser.json());

//use routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api', postRoute);

app.listen(port, () => {
    console.log(`server is runing on port ${port}`)
});