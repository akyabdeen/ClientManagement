import { ClientController } from "../controllers/client.controller";

import { Router } from "express";

export class ClientRoutes {
    public path : string = '/client';
    public router : Router = Router()
    public client_controller = new ClientController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get(`${this.path}`, this.client_controller.getClients);
        this.router.get(`${this.path}/:id`, this.client_controller.getClientById);

    }
}