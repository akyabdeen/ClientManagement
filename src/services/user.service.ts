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

    public createUserClient = async (phone: string, user_id?: number) => {
        let create_data : any = {phone, record: 2};
        
        if (user_id) {
            const previous_user = await this.user.findOne({where: {id:user_id, record: 2}, raw: true});
            
            await this.user.update({record:3}, {where: {id: user_id}});
        }

        const user = await this.user.create(create_data);
        
        return user;
    } 

    public findClientByPhone = async (phone: string) => {
        const user = await this.user.findOne({where: {phone}, raw: true});
    
        return user;
    }
}