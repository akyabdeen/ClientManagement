import express from "express"
import { NODE_ENV, PORT } from "./config";

import cors from "cors";
import cookieParser from "cookie-parser";

import { Route } from "./interfaces/route.interface";
import { DB } from "./database";

export class App {
    public app : express.Application;
    private env : string;
    private port : number | string;

    constructor (routes: Route[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    public listen () {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        })
    }

    private connectToDatabase() {
        DB.sequelize.sync({ force: false });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({origin: 'http://localhost:3001', credentials: true}));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Route[]) {
        routes.map(route => {
            this.app.use('/', route.router);
        })
    }
}