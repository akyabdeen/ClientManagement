import "reflect-metadata"

import Container from "typedi";
import { Request, Response, NextFunction } from "express"

import { AuthService } from "../services/auth.service";
import { HttpException } from "../exceptions/http.exception";

export class AuthController {
    private auth_service = Container.get(AuthService);

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, password} = req.body;

            if (!username || !password) throw new HttpException(400, 'Please provide a valid username and password');

            const {cookie, token} = await this.auth_service.login(username, password);
            
            res.setHeader('Set-Cookie', cookie);
            res.status(200).json({token, message: 'login'});
        } catch (error) {
            next(error)
        }
    }
}