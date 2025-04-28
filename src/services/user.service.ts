import { Service } from "typedi";
import { DB } from "../database";
import { HttpException } from "../exceptions/http.exception";

@Service()
export class UserService {
    private user = DB.User;

    public findUserByUsername = async (username: string) => {
        const user = await this.user.findOne({where: {username}, raw: true});

        if (!user) throw new HttpException(404, 'User not found');

        return user;
    } 
}