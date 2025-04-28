import "reflect-metadata";

import Container, { Service } from "typedi";
import { DB } from "../database";
import { UserService } from "./user.service";
import { HttpException } from "../exceptions/http.exception";

@Service()
export class ClientService {
    private client = DB.Client;
    private client_status = DB.ClientStatus;
    private user_service = Container.get(UserService);

    public getAllClients = async () => {
        const clients = await this.client.findAll({where: {record: 2}, raw: true});
        const client_status = await this.client_status.findAll({raw: true});

        const return_data = clients.map(client => {
            let client_organized = {
                ...client,
                status: client_status.find(cs => cs.id == client.status)
            }

            delete client_organized.user_id;

            return client_organized;
        });

        return return_data;
    }

    public getClientById = async (id: number) => {
        const client = await this.client.findOne({where: {id, record: 2}, raw: true});

        if (!client) throw new HttpException(404, 'Client not found');

        const client_status = await this.client_status.findAll({raw: true});
        
        let return_data = {
                ...client,
                status: client_status.find(cs => cs.id == client.status)
            }

        delete return_data.user_id;

        return return_data;
    }
}