import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ClientStatusInterface } from "../interfaces/client_status.interface";

export type ClientStatusCreationAttributes = Optional<ClientStatusInterface, 'id'>;

export class ClientStatusModel extends Model<ClientStatusInterface, ClientStatusCreationAttributes> implements ClientStatusInterface {
    public id: number;
    public name: string;
}

export default function (sequelize: Sequelize): typeof ClientStatusModel {
    ClientStatusModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'client_status',
            sequelize,
            timestamps: false,
        }
    );

    return ClientStatusModel;
}