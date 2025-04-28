import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
    public router : Router = Router()
    public auth_controller = new AuthController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.post('/login', this.auth_controller.login);
    }
}