import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ClientInterface } from "../interfaces/client.interface";

export type ClientCreationAttributes = Optional<ClientInterface, 'id' | 'user_id'>;

export class ClientModel extends Model<ClientInterface, ClientCreationAttributes> implements ClientInterface {
    public id: number;
    public user_id: number;
    public name: string;
    public phone: string;
    public email: string;
    public deal_type: number;
    public notes: string;
    public status: number;
    public record: number;
}

export default function (sequelize: Sequelize): typeof ClientModel {
    ClientModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deal_type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 999
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 101
            },
            record: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2
            },
        },
        {
            tableName: 'client',
            sequelize,
            timestamps: false,
        }
    );

    return ClientModel;
}