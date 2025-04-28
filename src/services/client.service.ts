import "reflect-metadata";

import Container, { Service } from "typedi";
import { DB } from "../database";
import { UserService } from "./user.service";
import { HttpException } from "../exceptions/http.exception";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";

@Service()
export class ClientService {
    private client = DB.Client;
    private client_status = DB.ClientStatus;
    private user_service = Container.get(UserService);

    public getAllClients = async () => {
        const clients = await this.client.findAll({ where: { record: 2 }, raw: true });
        const client_status = await this.client_status.findAll({ raw: true });

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
        const client = await this.client.findOne({ where: { id, record: 2 }, raw: true });

        if (!client) throw new HttpException(404, 'Client not found');

        const client_status = await this.client_status.findAll({ raw: true });

        let return_data = {
            ...client,
            status: client_status.find(cs => cs.id == client.status)
        }

        delete return_data.user_id;

        return return_data;
    }

    public createClient = async (createClientData: CreateClientDTO) => {
        const client = await this.client.findOne({ where: { phone: createClientData.phone, record: 2 } });

        if (client) throw new HttpException(409, 'Client with phone already exists');

        const new_user = await this.user_service.createUserClient(createClientData.phone);
        const new_client = await this.client.create({
            ...createClientData,
            user_id: new_user.id,
        }, { raw: true });

        const client_status = await this.client_status.findAll({ raw: true });

        let return_data = {
            ...new_client,
            status: client_status.find(cs => cs.id == createClientData.status)
        }

        delete return_data.user_id;

        return return_data;
    }

    public updateClient = async (id: number, updateClientData: UpdateClientDTO) => {

        console.log(updateClientData);

        const client = await this.client.findOne({where: {id, record: 2}, raw: true});

        if (!client) throw new HttpException(404, 'Client not found');

        let new_user_id = client.user_id;
        let update_obj : any = {...updateClientData};

        if (update_obj.status) throw new HttpException(400, 'Use the dedicated route to update the client status');

        for (let key of Object.keys(client)) {
            if (!update_obj[key] && key !== 'id')  {
                update_obj[key] = client[key]
            }
        }

        if (update_obj.id) delete update_obj.id;

        if (updateClientData.phone) {
            const user_client = await this.client.findOne({ where: {phone: updateClientData.phone, record: 2}, raw: true });

            if (!user_client) {
                new_user_id = (await this.user_service.createUserClient(updateClientData.phone, new_user_id)).id;
                update_obj = {...update_obj, user_id: new_user_id}
            } else {
                throw new HttpException(409, 'Phone number already exists');
            }
        }

        await this.client.update({record: 3}, {where: {id}});
        await this.client.create(update_obj);

        return 'Done';
    }

    public updateStatus = async (id: number, updated_status: number) => {
        const client = await this.client.findOne({where: {id, record: 2}, raw: true});

        const client_status = await this.client_status.findOne({where: {id: updated_status}});

        if (!client) throw new HttpException(404, 'Client not found');
        if (!client_status) throw new HttpException(404, 'Client status not found');
        if (client.status == updated_status) throw new HttpException(400, 'Client already has this status');

        await this.client.update({status: updated_status}, {where: {id}});

        return 'Done';
    }
}