import "reflect-metadata"

import { Request, Response, NextFunction } from "express"

import Container from "typedi";
import { ClientService } from "../services/client.service";
import { HttpException } from "../exceptions/http.exception";

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
}