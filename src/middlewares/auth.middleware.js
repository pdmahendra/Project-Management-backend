import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json({ message: "Session expired, please login again to continue" });
        } else {
            return res.status(401).json({ message: "Invalid access token" });
        }
    }
}


