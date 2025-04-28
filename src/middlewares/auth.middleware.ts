import { verify } from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/auth.interface";

import { Response, NextFunction } from "express";
import { SECRET_KEY } from "../config";
import { UserInterface } from "../interfaces/user.interface";

const getAuthorization = (req) => {
    const cookies = req.cookies;

  
    console.log(cookies);

    const token = cookies.Authorization ?? cookies.authorization;

    console.log(token);

    if (token) return token;

    const header = req.header('Authorization');
    if (header) return header.split('Bearer ')[1];


    return null;
}

export const authenticate = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
        res.status(401).json({message: "Credentials invalid"});
        return;
    }

    try {
        const user = verify(Authorization, SECRET_KEY) as UserInterface;
        
        if (user.user_type !== 1) {
            res.status(403).json({message: "You are not allowed to log in"});
        }

        req.user = user;
        
        next();
    } catch (error) {
        res.status(401).json({message: "Credentials invalid"});
    }
}