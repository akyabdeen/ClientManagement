import { ClientController } from "../controllers/client.controller";

import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";
import { authenticate } from "../middlewares/auth.middleware";

export class ClientRoutes {
    public path : string = '/client';
    public router : Router = Router()
    public client_controller = new ClientController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get(`${this.path}`, authenticate, this.client_controller.getClients);
        this.router.get(`${this.path}/:id`, authenticate, this.client_controller.getClientById);

        this.router.post(`${this.path}`, validationMiddleware(CreateClientDTO), authenticate, this.client_controller.createClient);

        this.router.patch(`${this.path}/:id`, validationMiddleware(UpdateClientDTO), authenticate, this.client_controller.updateClient);
        this.router.put(`${this.path}/:id`, authenticate, this.client_controller.updateStatus);
    }
}