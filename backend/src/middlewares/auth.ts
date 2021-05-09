import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    user: object;
    iat: number;
    exp: number;
}

export default (req : Request, res : Response, next : NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
 
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY || 'default_token') as IPayload;
        //console.log(payload);
        if (!payload) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }

        req.user = payload;
        next();

    } catch (error) {
       console.error(error);
       res.json({
           message: "Something went wrong"
       })
    }
}