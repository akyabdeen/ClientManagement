import Sequelize from 'sequelize';
import { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } from '../config';
import UserModel from '../models/user.model';

const sequelize = new Sequelize.Sequelize(
    DB_DATABASE || 'default_database',
    DB_USER || 'default_user',
    DB_PASSWORD || 'default_password',
    {
        dialect: 'mysql',
        host: DB_HOST,
        port: 3306,
        timezone: '+09:00',
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            underscored: true,
            freezeTableName: true,
        },
        pool: {
            min: 0,
            max: 5,
        },
        benchmark: true,
    });

sequelize.authenticate();

export const DB = {
    User: UserModel(sequelize),
    sequelize
}