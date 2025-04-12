import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()
const DB_URI = process.env.DB_URI
const connectDB = async () => {
    mongoose.connect(DB_URI)
    .then (() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.log("Database connetion failed");
    });
}

export default connectDB