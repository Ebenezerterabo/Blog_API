import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app = express();

dotenv.config();
const port = process.env.PORT;

//Database connection
connectDB()

app.listen(port, () => {
    console.log(`server is runing on port ${port}`)
});