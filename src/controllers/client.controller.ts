import "reflect-metadata"

import { Request, Response, NextFunction } from "express"

import Container from "typedi";
import { ClientService } from "../services/client.service";
import { HttpException } from "../exceptions/http.exception";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";

export class ClientController {
    private client_service = Container.get(ClientService);

    public getClients = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clients = await this.client_service.getAllClients();

            res.status(200).json({data: clients, message: 'getAllClients'});
        } catch (error) {
            next(error);
        }
    }

    public getClientById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id) || id < 0) throw new HttpException(400, 'Id must be a valid number');

            const client = await this.client_service.getClientById(id);

            res.status(200).json({data: client, message: 'getClientById'});
        } catch (error) {
            next(error);
        }
    }

    public updateClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const updateClientData : UpdateClientDTO = req.body; 

            if (isNaN(id) || id < 0) throw new HttpException(400, 'Id must be a valid number');
   
            await this.client_service.updateClient(id, updateClientData);

            res.status(200).json({ message: 'Done' })
        } catch (error) {
            next(error);
        }
    }

    public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const updated_status = Number(req.body.status);

            if (isNaN(id) || id < 0) throw new HttpException(400, 'Id must be a valid number');
            if (!updated_status || isNaN(updated_status) || updated_status < 0) throw new HttpException(400, 'Updated status needs to be provided and needs to be a valid number');

            await this.client_service.updateStatus(id, updated_status);

            res.status(200).json({ message: 'Done' })
        } catch (error) {
            next(error);
        }
    }

    public createClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createClientData : CreateClientDTO = req.body; 
   
            const new_client = await this.client_service.createClient(createClientData);

            res.status(200).json({ data: new_client, message: 'Done' })
        } catch (error) {
            next(error);
        }
    }
}