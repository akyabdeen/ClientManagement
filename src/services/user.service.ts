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

    public createUserClient = async (user_id: number, phone: string) => {
        const previous_user = await this.user.findOne({where: {id:user_id}, raw: true});

        let create_data = {
            ...previous_user,
            phone
        }

        delete create_data.id;
        
        const user = await this.user.create(create_data);

        return user;
    } 

    public findClientByPhone = async (phone: string) => {
        const user = await this.user.findOne({where: {phone}, raw: true});
    
        return user;
    }
}