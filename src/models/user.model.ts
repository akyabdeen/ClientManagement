import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/user.interface";

export type UserCreationAttributes = Optional<UserInterface, 'id'>;

export class UserModel extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
    public id: number;
    public phone: string;
    public username: string;
    public password: string;
    public user_type: number;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2
            }
        },
        {
            tableName: 'user',
            sequelize,
            timestamps: false,
        }
    );

    return UserModel;
}