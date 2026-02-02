import type {NextFunction, Request, Response} from "express";
import type {IJwtPayload} from "../types/JwtPayload.js";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Not authorized'});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "Authorization token missing"});
    }
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as unknown;
        req.user = decoded as IJwtPayload;
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
}