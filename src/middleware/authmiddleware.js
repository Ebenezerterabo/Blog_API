import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedToken;
            next();
        } catch (error) {
            return res.status(401).json("Invalid token");
        }
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

export default verifyToken