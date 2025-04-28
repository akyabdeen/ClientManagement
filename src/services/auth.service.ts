import "reflect-metadata";

import { sign } from "jsonwebtoken";
import Container, { Service } from "typedi";
import { SECRET_KEY } from "../config";
import { UserService } from "./user.service";
import { HttpException } from "../exceptions/http.exception";

const createToken = (data: any) => {
    const expiresIn = 60 * 60;

    return { expiresIn, token: sign(data, SECRET_KEY, {expiresIn}) };
}

const createCookie = (token_data: any) => {
    return `Authorization=${token_data.token}; HttpOnly; Max-Age=${token_data.expiresIn}`;
}

@Service()
export class AuthService {
    private user_service = Container.get(UserService);

    public login = async (username: string, password: string) => {
        const user = await this.user_service.findUserByUsername(username);

        if (password != user.password) {
            throw new HttpException(401, 'Credentials invalid')
        }

        const token = createToken(user);
        const cookie = createCookie(token);

        return {cookie, token};
    }
}